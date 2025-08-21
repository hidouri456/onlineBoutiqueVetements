# Online Boutique Vêtements — Documentation d'utilisation

Résumé
-------
Ce dépôt contient une application Next.js (frontend) et un backend Express/MongoDB pour une boutique de vêtements. La documentation ci-dessous explique comment installer, démarrer et tester localement, comment créer un compte administrateur, et comment fonctionne l'authentification et le chatbot (mode mock / OpenAI).

Prérequis
---------
- Node.js (>=18 recommandé)
- npm ou pnpm
- MongoDB (local ou remote) et l'URL de connexion

Configuration des variables d'environnement
-------------------------------------------
Les variables principales se trouvent côté frontend (`.env.local`) et backend (`backend/.env`). Créez-les si elles n'existent pas.

Fichier `app/.env.local` (Next.js)
- `OPENAI_API_KEY` = clé OpenAI si vous souhaitez utiliser l'API (format `sk-...`). Si absent, le chatbot frontend passera en mode mock.

Fichier `backend/.env` (exemples)
- `MONGO_URI` = connexion MongoDB (ex: `mongodb://localhost:27017/boutique`)
- `PORT` = port du backend (par défaut 5001)
- `NODE_ENV` = `development` ou `production`
- `JWT_SECRET` = secret utilisé pour signer les tokens JWT (nécessaire si vous utilisez la vérification JWT)

Installation
------------
1. Installer les dépendances du backend :

```powershell
cd backend
npm install
```

2. Installer les dépendances du frontend (racine du repo) :

```powershell
cd ..\
npm install
```

Démarrer les serveurs
---------------------
- Backend (écoute par défaut sur le port 5001) :

```powershell
cd backend
npm run dev
```

- Frontend Next.js (par défaut port 3000) :

```powershell
# depuis la racine du repo
npm run dev
```

Créer un administrateur (seed)
------------------------------
Un script `backend/seedAdmin.js` a été ajouté pour créer rapidement un compte admin de test :
- Email : `admin@boutique.com`
- Mot de passe : `Admin123!`

Exécuter depuis le dossier `backend` :

```powershell
cd backend
npm run seed:admin
```

Authentification et flux
------------------------
- Endpoint backend pour l'auth :
  - `POST http://localhost:5001/api/users/login` — attend `{ email, password }` et renvoie `{ _id, firstName, lastName, email, role }`. Le backend place maintenant un cookie `token` en HttpOnly.
  - `POST http://localhost:5001/api/users/register` — création d'utilisateur (idem : cookie `token`).
  - `POST http://localhost:5001/api/auth/logout` — efface le cookie `token`.

- Frontend : la page de connexion (`/auth/connexion`) envoie la requête avec `credentials: 'include'`. Le token d'authentification est stocké dans un cookie HttpOnly (non accessible côté JS). Le `role` est stocké côté client dans `localStorage` pour effectuer des redirections rapides (admin -> `/admin`).

Administration et protection
----------------------------
- `app/admin/layout.tsx` contient une protection client-side (vérifie `localStorage.role` et redirige si non-admin). De plus, `middleware.ts` (Next.js) protège les routes `/admin` côté serveur en vérifiant la présence du cookie `token` et redirige vers `/auth/connexion` si absent.

Remarques de sécurité
- Le cookie `token` est HttpOnly, ce qui réduit le risque de vol via XSS.
- Pour une sécurité complète, il est recommandé de :
  - Vérifier/valider le JWT dans `middleware.ts` (je peux l'ajouter) pour garantir que le token est valide et contient le rôle `admin`.
  - Ne pas conserver `role` en clair dans `localStorage` et récupérer le profil via une requête sécurisée (`/api/users/profile`) après connexion.
  - Implémenter l'invalidation de token côté serveur si nécessaire (liste noire) pour logout forcé.

Chatbot (OpenAI / mock)
-----------------------
- Frontend a un endpoint Next.js `app/api/chat/route.ts` :
  - Si `OPENAI_API_KEY` est configurée, le routeur streamera les réponses via l'API OpenAI.
  - Si aucune clé n'est configurée, la route retourne une réponse mock (texte simple) — le frontend gère ce cas et affiche la réponse.

Dépannage courant
-----------------
- Erreur `Failed to fetch` lors du formulaire (inscription/connexion) :
  - Vérifiez que le backend est démarré (port 5001 par défaut).
  - Vérifiez que la requête utilise `http://localhost:5001` (ou le bon host/port) et que `credentials: 'include'` est présent si vous utilisez cookie.
  - Si CORS bloque : assurez-vous que le backend utilise `cors({ origin: true, credentials: true })`.

- Cookie `token` absent après connexion :
  - Assurez-vous que le backend a défini le cookie (vérifier logs backend) et que la requête frontend utilise `credentials: 'include'`.
  - En local, `secure` n'est activé que si `NODE_ENV === 'production'`.

- Accès `/admin` redirigé alors que vous êtes connecté :
  - Vérifiez `localStorage.role` et le cookie `token` (DevTools > Application > Cookies).
  - Middleware actuel ne vérifie que l'existence du cookie, pas le rôle. Pour valider le rôle, ajoutez vérification JWT côté middleware ou appelez le backend.

Commandes utiles récapitulatives
--------------------------------
```powershell
# backend
cd backend
npm install
npm run dev
npm run seed:admin

# frontend (depuis la racine)
npm install
npm run dev
```

Prochaines améliorations recommandées (je peux implémenter)
---------------------------------------------------------
- Valider et décoder le JWT dans `middleware.ts` pour vérifier le rôle `admin` à la racine (plus sûr).
- Remplacer `localStorage.role` par une requête `/api/users/profile` sécurisée après connexion.
- Ajouter un endpoint / proxy Next.js pour éviter d'appeler directement le backend depuis le frontend pendant le développement.

Support
-------
Si vous voulez que j'ajoute la vérification JWT dans `middleware.ts` ou que je remplace la stratégie de stockage du rôle, dites laquelle et je l'implémente.

---
Faites-moi savoir si vous souhaitez que j'ajoute ce fichier `README.md` au dépôt (je l'ai déjà créé) ou que j'implémente l'une des améliorations ci‑dessous.
