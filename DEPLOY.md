# Workflow de déploiement — chez-casdal

Doc qui explique comment le repo est organisé, comment déployer en prod, et comment le bot blog tourne tout seul.

---

## 1. Le modèle de branches

| Branche | Rôle |
|---|---|
| `main` | Reflète exactement ce qui est déployé en prod sur Vercel. **Jamais de commit direct** (sauf le bot blog). |
| `develop` | Branche d'intégration permanente. C'est là qu'on bosse au quotidien. **Ne se ferme jamais.** |
| `feature/*` | Branches éphémères créées depuis `develop` pour chaque nouveau truc. Supprimées après merge. |

Schéma :

```
main    ──●─────────────●─────────●──   (prod)
           \           /         /
develop    ●──●──●──●──●──●──●──●        (intégration permanente)
              \     /  \      /
feature/A      ●──●     \    /
feature/B               ●───●
```

---

## 2. Workflow au quotidien

### A. Démarrer un nouveau truc

```bash
git checkout develop
git pull
git checkout -b feature/nom-du-truc
```

### B. Pendant le dev

```bash
git add .
git commit -m "..."
git push -u origin feature/nom-du-truc
```

→ Vercel crée automatiquement une URL de **preview** pour cette branche (utile pour tester avant de merger).

### C. Quand la feature est prête → merge dans `develop`

Soit via PR sur GitHub (recommandé), soit en direct :

```bash
git checkout develop
git pull
git merge feature/nom-du-truc
git push
git branch -d feature/nom-du-truc
git push origin --delete feature/nom-du-truc
```

### D. Quand `develop` est prête pour la prod → déployer

1. Ouvrir `https://github.com/Emiiir95/chez-casdal/compare/main...develop`
2. Vérifier le sens : **base: `main`** ← compare: **`develop`**
3. **Create pull request** → titre clair (ex: "Release v1.2") → **Create**
4. **Merge pull request**
5. ⚠️ **NE PAS** cliquer "Delete branch" → `develop` doit rester
6. GitHub Actions déclenche automatiquement le déploiement Vercel (voir section 4)

### E. Resynchroniser `develop` après le merge en prod

`main` a maintenant un commit de plus (le merge commit). Pour que `develop` reparte d'une base à jour :

```bash
git checkout develop
git pull origin main --no-rebase
git push
```

---

## 3. Le bot blog automatique

Le workflow [.github/workflows/generate-blog.yml](.github/workflows/generate-blog.yml) tourne **tous les jours à 04:00 UTC** (≈ 6h Paris été / 5h Paris hiver) :

1. Checkout explicite de `main`
2. `npm run generate:blog` (utilise `ANTHROPIC_API_KEY` depuis GitHub Secrets)
3. Si un nouvel article est généré → commit + push sur `main`
4. Le push sur `main` déclenche le workflow de déploiement (voir section 4)

**Important :** comme le bot push directement sur `main`, `develop` prend du retard à chaque article. Avant chaque nouvelle feature, pense à :

```bash
git checkout develop
git pull origin main --no-rebase
git push
```

---

## 4. Déploiement automatique sur Vercel

### Principe

Aucun lien direct GitHub ↔ Vercel n'est configuré (volonté de ne pas connecter un compte GitHub perso à un compte Vercel partagé entre plusieurs personnes).

À la place, [.github/workflows/deploy.yml](.github/workflows/deploy.yml) utilise la **CLI Vercel** avec un **token API** stocké dans GitHub Secrets.

### Déclencheur

Le workflow se lance à chaque push sur `main`, donc :
- Merge d'une PR `develop` → `main` (déploiement manuel "release")
- Commit du bot blog (déploiement quotidien automatique)

### Étapes du workflow

1. Checkout du repo
2. Install Node 20
3. Install Vercel CLI
4. `vercel pull` (récupère les variables d'env de prod)
5. `vercel build --prod` (build local)
6. `vercel deploy --prebuilt --prod` (push le build vers Vercel)

### Secrets requis (GitHub → Settings → Secrets and variables → Actions)

| Secret | Source |
|---|---|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens |
| `VERCEL_PROJECT_ID` | Vercel → Projet → Settings → General (en bas) |
| `VERCEL_ORG_ID` | Vercel → Team Settings → General (= Team ID) |
| `ANTHROPIC_API_KEY` | https://console.anthropic.com (pour le bot blog) |

### Variables d'environnement runtime

Les variables d'env utilisées par le site lui-même (DB, API keys, etc.) sont gérées **directement dans Vercel** (Project → Settings → Environment Variables). Elles sont récupérées au build par `vercel pull`.

---

## 5. Récap des cycles

### Cycle "release manuelle" (toi qui déploie une mise à jour)

```
développer sur feature/* → merge dans develop →
PR develop → main → merge → workflow deploy.yml → Vercel prod
```

### Cycle "blog quotidien" (automatique)

```
GitHub Actions 04:00 UTC → genère article → push main →
workflow deploy.yml → Vercel prod
```

---

## 6. En cas de problème

### Le déploiement plante

→ GitHub → onglet **Actions** → ouvrir le run rouge → lire les logs de l'étape qui a échoué.

### Vercel n'a pas redéployé

→ Vérifier que le workflow s'est bien lancé sur l'onglet Actions. Si oui mais sans effet, vérifier les 3 secrets Vercel.

### `develop` est "behind" `main`

→ Normal, le bot push des articles sur `main`. Resynchroniser :
```bash
git checkout develop && git pull origin main --no-rebase && git push
```

### Conflit lors du merge develop → main

→ Probablement parce qu'un article du bot a touché un fichier que `develop` touche aussi (rare). Résoudre le conflit localement :
```bash
git checkout develop
git pull origin main --no-rebase
# résoudre les conflits dans l'éditeur
git add .
git commit
git push
# puis recréer la PR
```
