# Règles de design — Night Shift Kajazoma

## Mission

Utiliser **UI/UX Pro Max** comme compétence de conseil et de contrôle qualité visuel, en complément des vérifications techniques. L'objectif est de repérer et corriger les défauts UI/UX réels sans dénaturer l'identité actuelle de Kajazoma.

Compétence de référence : https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

> Cette page définit les règles propres au projet. Elle ne remplace pas l'installation effective de UI/UX Pro Max dans l'environnement de l'agent de développement.

## Identité à préserver

Direction actuelle : **premium · éditoriale · chaleureuse**.

- Palette existante : noir / vert très sombre, crème et or Kajazoma.
- Typographie : titres à empattements (serif) ; informations et actions en Inter.
- Photographies : priorité aux photos réelles du restaurant, avec un rendu naturel.
- Expérience : mobile-first, lisible, élégante et simple à utiliser.
- Conserver autant que possible l'identité visuelle existante ; ne pas réinventer le site à chaque passage.

Ces éléments sont la référence de départ, pas une autorisation de modifier la palette ou la typographie.

## Mode opératoire obligatoire : analyser avant de modifier

1. Examiner le code, les styles existants et les consignes du dépôt avant de proposer un changement.
2. Si UI/UX Pro Max est installé, consulter ses recommandations pertinentes (style, palette, typographie, responsive, accessibilité et pile technique). Adapter ses suggestions à Kajazoma au lieu d'appliquer aveuglément un thème générique.
3. Distinguer clairement :
   - **Défaut confirmé** : débordement, contenu coupé, superposition involontaire, mauvaise taille ou alignement manifestement cassé, interaction inutilisable, contraste ou focus problématique.
   - **Suggestion esthétique** : nouvelle palette, nouvelle police, nouveau style, nouvelle composition ou nouvelle animation.
4. Commencer par un rapport d'audit : fichier/zone concernée, preuve observable, gravité, correction proposée et risque.
5. Ne pas appliquer de changement visuel important tant que l'utilisateur ne l'a pas approuvé.

## Corrections autorisées sans approbation préalable

Uniquement les corrections à faible risque qui rétablissent le comportement prévu, sans choix artistique nouveau :

- corriger un débordement ou un élément accidentellement coupé ;
- réparer un alignement ou une dimension manifestement cassés ;
- corriger un problème responsive reproductible ;
- restaurer un focus clavier ou une interaction existante qui ne fonctionne plus ;
- améliorer un attribut d'accessibilité ou une sémantique sans changer le contenu ni le rendu voulu.

Si la correction implique plusieurs interprétations visuelles plausibles, s'arrêter et demander l'avis de l'utilisateur.

## Changements qui exigent l'accord explicite de l'utilisateur

Ne pas modifier sans validation :

- couleurs, palette, typographies ou hiérarchie typographique ;
- structure majeure, ordre des sections, mise en page ou refonte d'un composant ;
- photos, remplacement d'images, recadrage créatif ou traitement visuel ;
- textes commerciaux, prix, promesses, CTA ou parcours de réservation ;
- animations décoratives, effets visuels marqués ou nouveau thème ;
- changement de dépendances ou installation d'outils/packages.

Présenter les propositions comme des options avec avantages, risques et aperçu attendu. Attendre le choix de l'utilisateur avant l'implémentation.

## Vérification visuelle et tests

- Ne jamais déclarer qu'une page a été inspectée visuellement sans capture d'écran ou navigateur réellement utilisé.
- Si aucun navigateur/capture fiable n'est disponible, marquer le contrôle visuel **BLOQUÉ — non vérifié**, et préciser les contrôles réalisés à la place.
- Tester les tailles mobiles représentatives, puis tablette et bureau lorsque les outils le permettent.
- Vérifier débordements horizontaux, navigation, menu, galerie/modale, formulaires et actions WhatsApp selon les composants touchés.
- Lancer les contrôles techniques disponibles (lint, build, tests) sans prétendre qu'ils prouvent la qualité visuelle.
- Ne pas inventer de résultats, de captures, de tests ou de mesures.

## Discipline de modification

- Un changement ciblé par commit, avec un message commençant par `nightshift:`.
- Ne pas réécrire ou reformater des fichiers sans rapport avec le problème.
- Ne pas écraser des modifications existantes.
- En cas d'incertitude, de test impossible, d'échec d'accès ou de risque de régression, arrêter et signaler le blocage.
- Ne pas déployer en production et ne pas fusionner de changements sans autorisation explicite.

## Format du compte rendu

À chaque passage, fournir :

1. **Constats confirmés** — faits observés et emplacement.
2. **Corrections appliquées** — changements précis et justification.
3. **Propositions en attente** — options nécessitant l'accord de l'utilisateur.
4. **Tests effectués** — commandes, tailles d'écran ou parcours réellement vérifiés.
5. **Blocages / non vérifié** — tout ce qui n'a pas pu être contrôlé.

**Règle finale :** UI/UX Pro Max conseille ; l'identité existante et les validations de l'utilisateur priment. Une recommandation générée par un outil n'est jamais une autorisation de refonte.
