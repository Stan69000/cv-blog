---
title: Derrière mes photos, toute une mécanique
description: >-
  Découvrez les coulisses de ma galerie photo : un univers artistique porté par
  une intégration entre iPhone, télévision, site web et kDrive, avec API,
  renommage automatique et signature personnalisable.
pubDate: '2026-10-11'
type: floppy
tags: []
featured: true
draft: false
---

Une lumière, une ambiance, un détail qui attire le regard. La photographie commence souvent comme ça : avec l’envie de garder quelque chose d’un instant.

Ma galerie est née de cette envie. J’y partage mes images, mes découvertes et les lieux que je traverse. Les séries se construisent au fil des sorties, avec leur atmosphère et leur histoire.

Mais derrière les photographies, il y a aussi un autre terrain de création : toute la technique qui permet de les organiser, de les retrouver et de les faire vivre sur différents écrans.

De mon iPhone à ma télévision, en passant par mon site et mon espace de stockage, je construis progressivement un ensemble où chaque outil trouve sa place.

## Donner une place aux images

Une photographie ne se regarde pas de la même manière sur un téléphone et sur un grand écran.

Sur l’iPhone, on la découvre rapidement, au creux de la main. Sur le site, on peut prendre le temps de parcourir une série, de passer d’une image à l’autre et de suivre un lieu sur la carte. Sur la télévision, elle prend une autre présence : les détails deviennent plus visibles, le regard peut s’attarder.

Ces différences influencent la conception de la galerie. Il faut respecter les cadrages, gérer les formats portrait et paysage, adapter le plein écran et garder une navigation simple.

J’aime cette idée qu’une même photographie puisse accompagner plusieurs moments : une découverte sur mobile, une visite sur ordinateur, un diaporama dans le salon.

## Relier l’iPhone, le site, la télévision et le Drive

L’iPhone est l’un des points d’entrée de ce parcours. La galerie devient ensuite l’espace de présentation, tandis que kDrive, chez Infomaniak, accueille les fichiers.

Pour relier ces éléments, j’utilise une API : une interface qui permet aux logiciels de communiquer directement entre eux. L’administration de la galerie peut ainsi envoyer les images vers kDrive, créer ou retrouver un dossier et enregistrer les références nécessaires à leur affichage.

Les dossiers peuvent reprendre le nom de la série et sa date. La catégorie « Galerie Photos » leur est attribuée automatiquement pour faciliter leur classement.

Le site reste hébergé chez O2Switch. Le stockage des images et leur présentation remplissent donc deux rôles distincts, reliés par cette intégration. Un relais sur le serveur d’administration permet de servir les versions destinées à la galerie, tout en gardant la clé API côté serveur.

À l’écran, on voit simplement une photographie. En dessous, plusieurs services coopèrent pour l’afficher.

## Automatiser les gestes répétitifs

À mesure que les séries s’enrichissent, les petites tâches d’organisation prennent de la place. Renommer chaque fichier, vérifier la numérotation, choisir son dossier… Répétées sur des dizaines d’images, elles deviennent vite fastidieuses.

Le renommage automatique permet de donner aux photos un nom cohérent avec leur série et de poursuivre la numérotation lors des imports suivants.

Pour la série « Instants », l’approche demande davantage de souplesse. Ces images n’appartiennent pas forcément à un reportage commun. Un titre personnel, un lieu ou une date apportent alors un contexte plus utile qu’un simple nom de fichier.

L’automatisation intervient ici au service de l’organisation. Le choix des images, leur ordre et ce qu’elles racontent restent des décisions personnelles.

## Une signature à la bonne mesure

La signature fait elle aussi partie de ce travail.

Je peux ajouter « © Stan Bouchet » en bas à droite, choisir sa couleur et sa police. Elle reste optionnelle : toutes les images n’appellent pas la même présence graphique.

Son placement tient compte des dimensions de la photographie, qu’elle soit verticale, horizontale ou panoramique. Les originaux des nouveaux imports sont conservés sans signature ; celle-ci concerne les versions de présentation.

Ce petit détail visible demande, lui aussi, quelques réglages en coulisses.

## Construire un outil qui accompagne mon regard

Ce projet réunit deux plaisirs : photographier et comprendre comment faire fonctionner les choses ensemble.

La galerie évolue avec mes usages. Chaque nouvelle série permet d’affiner le classement, la publication ou le confort de consultation. La technique m’aide à consacrer davantage de temps aux images et à leur donner une place qui me ressemble.

C’est aussi ce que j’ai envie de partager à travers ce site : un regard photographique, accompagné de toute la mécanique patiemment construite pour le rendre accessible.

**[Découvrir ma galerie photo →](https://stan-bouchet.eu)**

