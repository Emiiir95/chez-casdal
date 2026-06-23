import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { z } from "zod";
import { CONTACT_REASONS, getReasonLabel } from "@/data/contact-reasons";

const reasonValues = CONTACT_REASONS.map((r) => r.value) as [
  string,
  ...string[],
];

const contactSchema = z.object({
  reason: z.enum(reasonValues as [string, ...string[]], {
    message: "Raison de contact invalide",
  }),
  name: z.string().trim().min(2, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(200),
  subject: z.string().trim().min(2, "Sujet requis").max(200),
  message: z.string().trim().min(10, "Message trop court").max(5000),
  consent: z.literal(true, { message: "Consentement requis" }),
});

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation échouée",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) {
    console.error("Variables d'environnement Resend manquantes");
    return res.status(500).json({ error: "Configuration serveur incomplète" });
  }

  const { reason, name, email, subject, message } = parsed.data;
  const reasonLabel = getReasonLabel(reason);
  const resend = new Resend(RESEND_API_KEY);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeReason = escapeHtml(reasonLabel);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO.split(",").map((addr) => addr.trim()),
      replyTo: email,
      subject: `[${reasonLabel}] ${subject}`,
      text: `Nouveau message du formulaire de contact\n\nRaison : ${reasonLabel}\nDe : ${name} <${email}>\nSujet : ${subject}\n\n${message}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px;">
          <h2 style="color: #ff6b1a;">Nouveau message — Chez Casdal</h2>
          <p style="display: inline-block; background: #fff3e2; color: #c63f06; padding: 4px 12px; border-radius: 9999px; font-weight: 600; font-size: 13px;">
            ${safeReason}
          </p>
          <p style="margin-top: 16px;"><strong>De :</strong> ${safeName} &lt;${safeEmail}&gt;</p>
          <p><strong>Sujet :</strong> ${safeSubject}</p>
          <hr style="border: none; border-top: 1px solid #e0e7ef; margin: 16px 0;">
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return res.status(502).json({ error: "Échec de l'envoi du message" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erreur envoi mail:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
