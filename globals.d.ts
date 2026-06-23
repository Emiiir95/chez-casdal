// Déclarations de types pour les imports de feuilles de style.
// Permet les imports "side-effect" (ex. `import "./globals.css"`) sans
// erreur TypeScript 2882 dans l'éditeur.
declare module "*.css";
declare module "*.scss";
