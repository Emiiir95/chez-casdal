/**
 * Motifs proposés dans le formulaire de contact.
 * 👉 Ajoutez ou modifiez librement ces entrées.
 */
export const CONTACT_REASONS = [
  { value: "traiteur", label: "Service traiteur" },
  { value: "menu", label: "Question sur le menu / allergies" },
  { value: "avis", label: "Avis ou suggestion" },
  { value: "partenariat", label: "Partenariat / collaboration" },
  { value: "presse", label: "Presse / média" },
  { value: "autre", label: "Autre demande" },
] as const;

export type ContactReasonValue = (typeof CONTACT_REASONS)[number]["value"];

export function getReasonLabel(value: string): string {
  return CONTACT_REASONS.find((r) => r.value === value)?.label ?? value;
}
