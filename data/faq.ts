/**
 * Questions fréquentes regroupées par thème.
 * 👉 Modifiez librement les questions/réponses. La page FAQ et le JSON-LD
 *    Schema.org (rich snippets Google) sont générés automatiquement.
 */

export type FaqQuestion = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  title: string;
  items: FaqQuestion[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "Commande & livraison",
    items: [
      {
        question: "Comment passer commande ?",
        answer:
          "Vous pouvez commander directement au 09 82 31 48 06, venir sur place au 27 avenue des Béthunes à Saint-Ouen-l'Aumône, ou commander en livraison via Uber Eats et Deliveroo.",
      },
      {
        question: "Quelles zones livrez-vous ?",
        answer:
          "Nous livrons Saint-Ouen-l'Aumône, Pontoise, Cergy, Eragny, Méry-sur-Oise, Méry, Pierrelaye, Auvers-sur-Oise et les alentours. Un supplément de 2€ par menu s'applique sur les commandes livrées.",
      },
      {
        question: "Quels sont vos horaires ?",
        answer:
          "Nous sommes ouverts du mardi au dimanche soir : mardi, mercredi, jeudi et dimanche de 18h à 03h, vendredi et samedi de 18h à 04h. Fermé le lundi.",
      },
      {
        question: "Combien de temps pour préparer ma commande ?",
        answer:
          "Tout est préparé à la commande. Comptez en moyenne 10 à 15 minutes selon l'affluence. Pour gagner du temps, appelez-nous avant de venir.",
      },
    ],
  },
  {
    title: "Notre carte",
    items: [
      {
        question: "Avez-vous des options sans viande ?",
        answer:
          "Notre carte est principalement orientée burgers, sandwichs et chicken. Nous proposons des starters (calamar frit, chili cheese) et des desserts. Pour toute demande particulière, n'hésitez pas à nous appeler.",
      },
      {
        question: "Quel pain pour les sandwichs ?",
        answer:
          "Vous avez le choix entre tortilla, pain normal ou baguette / tradition (supplément 0,50€).",
      },
      {
        question: "Peut-on personnaliser sauces et crudités ?",
        answer:
          "Bien sûr. Précisez vos préférences au moment de la commande pour les sandwichs et burgers concernés.",
      },
    ],
  },
  {
    title: "Sur place",
    items: [
      {
        question: "Acceptez-vous les cartes bleues ?",
        answer:
          "Oui, nous acceptons les paiements en espèces et par carte bancaire (sans contact y compris).",
      },
      {
        question: "Peut-on venir en groupe ?",
        answer:
          "Bien sûr. Pour les grosses commandes ou les groupes, mieux vaut nous appeler à l'avance pour qu'on prépare tout sans vous faire attendre.",
      },
    ],
  },
];
