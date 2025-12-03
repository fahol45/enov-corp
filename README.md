## ENOV CORP - Site Next.js

Projet Next.js (App Router) pour présenter l’offre ENOV CORP (hydroponie, IoT, développement web/mobile).

## Lancer le projet

```bash
npm install
npm run dev
```

Le site est ensuite disponible sur [http://localhost:3000](http://localhost:3000).

## Configuration du formulaire de contact

La page `/contact` inclut un formulaire qui envoie les briefs via SMTP.

1. **Copier la configuration**  
   Dupliquez `.env.local.example` vers `.env.local`.

2. **Configurer Gmail (ou votre SMTP)**  
   - Pour Gmail : générez un **mot de passe d’application** (Compte Google → Sécurité → Mots de passe d’application).  
   - Remplacez `SMTP_PASS` par ce mot de passe généré.  
   - Les valeurs par défaut (`SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=enovcorporation@gmail.com`) conviennent pour Gmail. Adaptez-les si vous utilisez un autre fournisseur.

3. **Destinataire**  
   `CONTACT_RECIPIENT` vaut `enovcorporation@gmail.com` par défaut. Modifiez-le si nécessaire.

4. **Redémarrer**  
   Relancez `npm run dev` ou votre hébergement pour prendre en compte les variables.

Sans ces variables, le formulaire retournera `Email service is not configured.`.

## Scripts utiles

```bash
npm run dev     # Mode développement
npm run build   # Build de production
npm run start   # Lancement du build
npm run lint    # Vérifications ESLint
```
