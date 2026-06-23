import { useState, type FormEvent } from "react";
import {
  FaPaperPlane as Send,
  FaCircleCheck as CheckCircle2,
  FaCircleExclamation as AlertCircle,
} from "react-icons/fa6";
import Button from "@/components/atoms/Button";
import { SITE } from "@/data/site";
import { CONTACT_REASONS } from "@/data/contact-reasons";

type FormValues = {
  reason: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = {
  reason: "",
  name: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
};

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.reason) errors.reason = "Veuillez choisir la raison de votre contact.";
  if (!values.name.trim()) errors.name = "Veuillez indiquer votre nom.";
  if (!values.email.trim()) {
    errors.email = "Veuillez indiquer votre e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Cet e-mail ne semble pas valide.";
  }
  if (!values.subject.trim()) errors.subject = "Veuillez indiquer un sujet.";
  if (!values.message.trim()) {
    errors.message = "Veuillez écrire un message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Votre message est un peu court (10 caractères min.).";
  }
  if (!values.consent) errors.consent = "Vous devez accepter pour pouvoir envoyer le message.";
  return errors;
}

const inputClasses =
  "w-full rounded-2xl border border-charbon-200 bg-white px-4 py-3 outline-none transition-colors focus:border-flamme-500";

const errorTextClass = "mt-1.5 flex items-center gap-1.5 text-sm text-flamme-600";

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  function update<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Échec de l'envoi");

      setStatus("success");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-4xl border border-flamme-500/30 bg-creme-100 p-10 text-center"
      >
        <CheckCircle2 className="h-14 w-14 text-flamme-500" />
        <h3 className="mt-4 font-display text-2xl tracking-wider">
          Message bien reçu, merci !
        </h3>
        <p className="mt-2 max-w-md text-charbon-600">
          On vous répond dès que possible. Pour une commande, appelez-nous
          directement au {SITE.phone}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-bold uppercase tracking-wider text-flamme-500 hover:text-flamme-600"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="reason" className="mb-1.5 block font-bold">
          Raison du contact <span className="text-flamme-500">*</span>
        </label>
        <select
          id="reason"
          name="reason"
          value={values.reason}
          onChange={(e) => update("reason", e.target.value)}
          aria-invalid={!!errors.reason}
          aria-describedby={errors.reason ? "reason-error" : undefined}
          className={`${inputClasses} ${
            values.reason === "" ? "italic text-charbon-500" : "text-charbon-900"
          }`}
        >
          <option value="" disabled hidden>
            — Choisissez une raison —
          </option>
          {CONTACT_REASONS.map((reason) => (
            <option
              key={reason.value}
              value={reason.value}
              className="not-italic text-charbon-900"
            >
              {reason.label}
            </option>
          ))}
        </select>
        {errors.reason && (
          <p id="reason-error" className={errorTextClass}>
            <AlertCircle className="h-4 w-4" /> {errors.reason}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block font-bold">
          Nom <span className="text-flamme-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClasses}
          placeholder="Votre nom"
        />
        {errors.name && (
          <p id="name-error" className={errorTextClass}>
            <AlertCircle className="h-4 w-4" /> {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block font-bold">
          E-mail <span className="text-flamme-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClasses}
          placeholder="vous@exemple.fr"
        />
        {errors.email && (
          <p id="email-error" className={errorTextClass}>
            <AlertCircle className="h-4 w-4" /> {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block font-bold">
          Sujet <span className="text-flamme-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={(e) => update("subject", e.target.value)}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={inputClasses}
          placeholder="Précisez l'objet de votre message"
        />
        {errors.subject && (
          <p id="subject-error" className={errorTextClass}>
            <AlertCircle className="h-4 w-4" /> {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-bold">
          Message <span className="text-flamme-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClasses} resize-y`}
          placeholder="Écrivez-nous votre message…"
        />
        {errors.message && (
          <p id="message-error" className={errorTextClass}>
            <AlertCircle className="h-4 w-4" /> {errors.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="consent"
          className="flex items-start gap-3 text-sm text-charbon-700"
        >
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-charbon-300 text-flamme-500 focus:ring-flamme-500"
          />
          <span>
            J&apos;accepte que mes informations soient utilisées pour traiter ma
            demande. <span className="text-flamme-500">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className={errorTextClass}>
            <AlertCircle className="h-4 w-4" /> {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="flex items-center gap-1.5 text-sm text-flamme-600">
          <AlertCircle className="h-4 w-4" /> Une erreur est survenue. Réessayez
          ou écrivez-nous à {SITE.email}.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Envoi en cours…" : "Envoyer le message"}
        <Send className="h-4 w-4" />
      </Button>

      <p className="text-xs text-charbon-500">
        Les champs marqués d&apos;un <span className="text-flamme-500">*</span>{" "}
        sont obligatoires.
      </p>
    </form>
  );
}
