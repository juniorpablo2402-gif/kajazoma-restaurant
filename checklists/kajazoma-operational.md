# KAJAZOMA MASTER — Checklist opérationnelle

> Référentiel de contrôle à appliquer avant toute modification importante et avant toute release.
> Priorité : intégrité/sécurité → accessibilité → fonctionnalité/UX → vérité du contenu → identité Kajazoma → design → performance → SEO → analytics → esthétique.

## 0. Fiche de contrôle

- Version / release :
- Date :
- Branche :
- Modification :
- Responsable :
- Commit :
- Deployment Vercel :
- Statut global : [ ] PASS [ ] BLOCK

## 1. Design & identité

### Identité
- [ ] Palette Kajazoma respectée : noir / vert très sombre / crème / or.
- [ ] Typographies conformes au système Kajazoma.
- [ ] Titres éditoriaux en serif.
- [ ] Informations, navigation et actions en sans-serif.
- [ ] Hiérarchie visuelle claire.
- [ ] Espacements et alignements cohérents.
- [ ] Photographies traitées de façon éditoriale.
- [ ] Aucun composant générique, décoratif ou « AI-looking » inutile.
- [ ] Aucun faux contenu visuel.

### Interface
- [ ] Boutons cohérents avec la direction premium.
- [ ] États hover / focus / active cohérents.
- [ ] Aucun élément involontairement superposé.
- [ ] Aucun débordement horizontal.
- [ ] Aucune régression visuelle hors périmètre.

**Design : [ ] PASS [ ] FAIL**

## 2. Contenu & données métier

- [ ] Aucun prix inventé.
- [ ] Aucun plat ou service inventé.
- [ ] Adresse vérifiée.
- [ ] Téléphone vérifié.
- [ ] WhatsApp vérifié.
- [ ] Google Maps vérifié.
- [ ] Menu vérifié.
- [ ] Réservation vérifiée.
- [ ] Textes courts, naturels, premium et chaleureux.
- [ ] Aucune mention inutile de l’IA ou du processus de génération.
- [ ] Aucune promesse non vérifiable.
- [ ] Toute donnée inconnue est marquée À VALIDER / À VÉRIFIER et non inventée.

**Contenu : [ ] PASS [ ] FAIL**

## 3. Responsive

### Viewports obligatoires
- [ ] 360 × 800
- [ ] 375 × 667
- [ ] 390 × 844
- [ ] Desktop ≥ 1024 px

### Contrôles
- [ ] Header et navigation fonctionnels.
- [ ] Hero correctement cadré.
- [ ] Titres sans collision ni troncature.
- [ ] Aucun scroll horizontal.
- [ ] Aucun élément coupé.
- [ ] Touch targets utilisables.
- [ ] Barre d’action mobile correctement positionnée.
- [ ] Formulaire de réservation utilisable.
- [ ] Galerie adaptée.
- [ ] Modales accessibles et scrollables.

### Menu mobile
- [ ] Filtres éditoriaux, sans pills.
- [ ] Aucun fond/contour arrondi parasite.
- [ ] Plats sans apparence de cards génériques.
- [ ] Séparateurs subtils.
- [ ] Noms courts et longs testés.
- [ ] Descriptions longues testées.
- [ ] Prix distincts et lisibles.
- [ ] Aucun chevauchement nom/prix.

**Responsive : [ ] PASS [ ] FAIL**

## 4. Accessibilité

- [ ] Navigation clavier fonctionnelle.
- [ ] Focus visible.
- [ ] Boutons et liens nommés correctement.
- [ ] Images avec alt pertinent lorsque nécessaire.
- [ ] Images décoratives correctement traitées.
- [ ] Hiérarchie H1 → H2 → H3 cohérente.
- [ ] Modales utilisables au clavier.
- [ ] Escape ferme les éléments appropriés.
- [ ] Focus restauré après fermeture d’une modale.
- [ ] Aucun piège clavier.
- [ ] Contrastes suffisants.
- [ ] Touch targets d’au moins 44 px lorsque nécessaire.
- [ ] Les informations importantes ne reposent pas uniquement sur la couleur.

**Accessibilité : [ ] PASS [ ] FAIL**

## 5. Fonctionnel & analytics

- [ ] Navigation fonctionne.
- [ ] Menu et filtres fonctionnent.
- [ ] Détail d’un plat fonctionne.
- [ ] Galerie fonctionne.
- [ ] WhatsApp fonctionne.
- [ ] Téléphone fonctionne.
- [ ] Google Maps fonctionne.
- [ ] Réservation fonctionne.
- [ ] Aucun événement analytics existant n’est cassé.

### Événements critiques
- [ ] whatsapp_click
- [ ] phone_click
- [ ] reservation_start
- [ ] reservation_request
- [ ] directions_click
- [ ] menu_view

**Fonctionnel : [ ] PASS [ ] FAIL**

## 6. SEO

- [ ] Title présent et pertinent.
- [ ] Meta description présente.
- [ ] viewport configuré.
- [ ] lang="fr" présent.
- [ ] Un H1 principal.
- [ ] Hiérarchie des titres cohérente.
- [ ] Liens fonctionnels.
- [ ] Images optimisées.
- [ ] Alt pertinents.
- [ ] Données structurées Restaurant cohérentes.
- [ ] Adresse et téléphone cohérents.
- [ ] URL menu correcte.
- [ ] URL réservation correcte.
- [ ] Aucun contenu SEO artificiel ou sur-optimisé.

**SEO : [ ] PASS [ ] FAIL**

## 7. Git / GitHub

- [ ] Modification limitée au périmètre demandé.
- [ ] Aucun fichier inutile modifié.
- [ ] Aucun secret ou identifiant sensible ajouté.
- [ ] Aucun fichier temporaire commité.
- [ ] Diff relu.
- [ ] Régression vérifiée.
- [ ] Message de commit explicite.
- [ ] Branche de travail correcte.
- [ ] main protégée : pas de modification directe sans validation.

Format recommandé :

`type(scope): description`

Exemples :
- `feat(menu): improve editorial mobile layout`
- `fix(reservation): correct mobile form spacing`
- `style(typography): refine Kajazoma font system`
- `fix(a11y): improve mobile navigation focus`

**Git : [ ] PASS [ ] FAIL**

## 8. Vercel

- [ ] Commit GitHub présent.
- [ ] Deployment créé.
- [ ] Build terminé avec succès.
- [ ] Statut Vercel = READY.
- [ ] Aucun build error.
- [ ] Aucun runtime error connu.
- [ ] Preview vérifiée.
- [ ] Production vérifiée après déploiement.
- [ ] Fonctionnalités critiques vérifiées sur le déploiement.
- [ ] Aucun changement inattendu par rapport à la version précédente.

### En cas d’échec
**STOP → BLOCK → identifier la cause → corriger → retester.**

**Vercel : [ ] PASS [ ] FAIL**

## 9. Règles de blocage

### BLOCK immédiat
- [ ] Donnée métier fausse ou inventée.
- [ ] Fonctionnalité principale cassée.
- [ ] Réservation cassée.
- [ ] WhatsApp ou téléphone cassé.
- [ ] Débordement mobile majeur.
- [ ] Problème d’accessibilité critique.
- [ ] Secret exposé.
- [ ] Build Vercel en échec.
- [ ] Régression majeure non corrigée.

### À CORRIGER
- [ ] Problème esthétique mineur.
- [ ] Espacement incohérent.
- [ ] Microcopy à améliorer.
- [ ] Optimisation SEO secondaire.
- [ ] Optimisation performance non critique.

### INFO
- [ ] Amélioration future non bloquante.
- [ ] Donnée non nécessaire au périmètre actuel.
- [ ] Optimisation future.

## 10. Release gate

**GLOBAL PASS uniquement si tous les contrôles critiques sont PASS.**

`FAIL → correction → retest → PASS`

- [ ] Design PASS
- [ ] Contenu PASS
- [ ] Responsive PASS
- [ ] Accessibilité PASS
- [ ] Fonctionnel PASS
- [ ] SEO PASS
- [ ] Git PASS
- [ ] Vercel PASS
- [ ] Aucun BLOCK ouvert
- [ ] Release autorisée

### Validation finale

- Commit :
- Deployment :
- Notes :
- Validé par :
- Date :
