# Chez Casdal — Site vitrine

Site vitrine du fast-food halal **Chez Casdal** (Saint-Ouen-l'Aumône).
100 % statique, Next.js + Tailwind. Tout le contenu est centralisé dans `data/`.

## Démarrer

```bash
npm install
npm run dev
```

## Où modifier quoi

| Besoin                                        | Fichier                                                             |
| --------------------------------------------- | ------------------------------------------------------------------- |
| Coordonnées, horaires, adresse                | `data/site.ts`                                                      |
| Carte du restaurant (items, prix, catégories) | `data/menu.ts`                                                      |
| Questions fréquentes                          | `data/faq.ts`                                                       |
| Motifs du formulaire de contact               | `data/contact-reasons.ts`                                           |
| Palette / couleurs                            | `tailwind.config.ts`                                                |
| Logo                                          | `public/images/logo_chez_casdal.png` (à remplacer par le PNG final) |
| Photos du menu                                | `public/images/menu/*` puis renseigner `image` dans `data/menu.ts`  |

## Ajouter un item au menu

Ouvrez `data/menu.ts`, ajoutez un objet dans le tableau `items` de la
catégorie. Exemple :

```ts
{
  id: "nouveau-burger",
  name: "Nouveau Burger",
  ingredients: ["Steak", "Cheddar", "Sauce maison"],
  priceMenu: 8,
  priceAlone: 7,
  image: "/images/menu/nouveau-burger.webp", // optionnel
  tags: ["nouveau"],
}
```

Si `image` est absent, le placeholder `/images/menu/placeholder.svg` est utilisé.

## Variables d'environnement (formulaire de contact)

```
RESEND_API_KEY=...
CONTACT_FROM=contact@chez-casdal.fr
CONTACT_TO=destination@chez-casdal.fr
```
