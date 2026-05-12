# FluxBill — Spécification Projet (Frontend React)

## 1) Vue d’ensemble

Application **React (SPA)** pour gérer :
- les **fournisseurs**
- les **factures**
- les **paiements**

L’application consomme une **API backend sécurisée par JWT** et centralise l’état global avec la **Context API**.

## 2) Objectifs produit

Le frontend doit permettre de :
- consommer une API sécurisée (JWT)
- gérer l’état global (auth, données partagées)
- naviguer entre plusieurs pages (routing)
- afficher dynamiquement les données backend
- centraliser la logique métier côté frontend

## 3) Stack & concepts attendus

- React
- React Router (routing)
- Context API (`useContext`) pour l’état global
- Appels API avec `fetch`/client HTTP + `useEffect`
- Authentification JWT (token stocké en `localStorage`)
- Routes protégées via composant de type `PrivateRoute` / `ProtectedRoute`

## 4) Contexte métier

Les entreprises/freelances doivent suivre :
- les montants facturés
- les échéances
- les paiements effectués
- la relation fournisseur

L’application sert à fiabiliser le suivi comptable opérationnel via une interface web.

## 5) Périmètre fonctionnel

### 5.1 Authentification

**Routes**
- `/login`
- `/register`

**Fonctionnalités**
- inscription utilisateur
- connexion + récupération du token JWT
- stockage du token dans `localStorage`
- récupération du profil utilisateur via `/api/auth/me`

### 5.2 Dashboard (`/`)

Afficher une vue consolidée via `/api/dashboard` :
- total des factures
- total des dépenses
- factures en retard
- résumé global

### 5.3 Gestion des fournisseurs

**Routes**
- `/suppliers`
- `/suppliers/:id`

**Fonctionnalités**
- Liste fournisseurs (`/suppliers`)
  - afficher tous les fournisseurs
  - naviguer vers le détail
- Détail fournisseur (`/suppliers/:id`)
  - informations fournisseur
  - statistiques via `/api/suppliers/:id/stats`
- création d’un fournisseur

### 5.4 Gestion des factures

**Routes**
- `/invoices`
- `/invoices/:id`

**Fonctionnalités**
- Liste factures (`/invoices`)
  - afficher toutes les factures
  - filtrer par statut : `unpaid`, `partially_paid`, `paid`
  - afficher montant, échéance, statut
- Détail facture (`/invoices/:id`)
  - informations complètes : fournisseur, montant, statut, date
  - afficher les paiements associés
- création d’une facture

### 5.5 Gestion des paiements

**Intégration**
- dans la page `/invoices/:id`

**Fonctionnalités**
- ajouter un paiement
- afficher la liste des paiements
- mettre à jour dynamiquement le statut de facture

## 6) Navigation attendue

| Route | Écran |
|---|---|
| `/` | Dashboard |
| `/login` | Connexion |
| `/register` | Inscription |
| `/suppliers` | Liste fournisseurs |
| `/suppliers/:id` | Détail fournisseur |
| `/invoices` | Liste factures |
| `/invoices/:id` | Détail facture |

## 7) Cas d’usage transverses

- inclure le token JWT dans toutes les requêtes API authentifiées
- protéger les routes privées
- propager les mises à jour globales après action utilisateur (login, ajout paiement, etc.)

## 8) Contraintes projet

- Travail collectif
- Durée : **5 jours**
- Lancement brief : **11/05/2026 à 11h30**
- Deadline livrables : **15/05/2026 avant 23h59**
- Dernier push GitHub : **dimanche avant 23h59**

## 9) Critères d’évaluation

- utilisation correcte de la Context API
- gestion du token JWT
- mise en place du routing
- gestion des appels API (`useEffect`)
- structuration des composants

## 10) Références pédagogiques

- `useContext`
- Custom Protected Route Component in React
