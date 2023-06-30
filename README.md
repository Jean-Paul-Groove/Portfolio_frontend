# Portfolio - Frontend

## Description:

Frontend du Portfolio React avec Typescript, construit avec Vite.

## Fonctionnalités

Portfolio avec galerie de projets, CV téléchargeable et formulaire de contact.

Interface administrateur pour modifier le contenu du portfolio (introduction, projets, CV).

## Comment lancer le projet ?

### Avec npm

Utilisez la commande `npm install` pour installer les dépendances.

Créer un fichier .env (cf partie suivante).

Utilisez la commande `npm  run dev` pour lancer le projet avec Vite.

## Variables d'environnement nécessaires

Pour que le projet fonctionne, vous devez renseigner deux variables d'environnement. L'adresse de l'API ainsi que l'adresse du cv.

Vite utilise par défaut dotenv et ne prend en compte que les variables préfixée d'un "VITE\_"

Se référer au fichier .env.template pour le modèle des variables à définir.

## Librairies utilisées

### React

Le frontend est réalisée en composant **React**.

### React Router

Le projet ayant une route "/admin", le routing est assuré par **React Router**.

### Dépendence de développement

Le projet est typé avec **Typescript** et les librairies de typages **@types/react** et **@types/react-dom**.

Utilisation de **eslint** comme linter.
