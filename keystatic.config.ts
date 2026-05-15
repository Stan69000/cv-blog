import { config, collection, singleton, fields } from '@keystatic/core';

const isDev = process.env.NODE_ENV !== 'production';

export default config({
  storage: isDev
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: 'Stan69000/cv-blog',
      },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({ label: 'Titre', validation: { length: { min: 1 } } }),
        description: fields.text({ label: 'Description' }),
        pubDate: fields.date({ label: 'Date de publication', defaultValue: { kind: 'today' } }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Livre', value: 'book' },
            { label: 'Disquette', value: 'floppy' },
          ],
          defaultValue: 'book',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({ label: 'En vedette', defaultValue: false }),
        draft: fields.checkbox({ label: 'Brouillon', defaultValue: false }),
        heroImage: fields.image({ label: 'Image à la une', directory: 'public/uploads', publicPath: '/uploads/' }),
        body: fields.mdx({ label: 'Contenu', extension: 'md' }),
      },
    }),

    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({ label: 'Titre', validation: { length: { min: 1 } } }),
        description: fields.text({ label: 'Description SEO' }),
        order: fields.number({ label: 'Ordre dans le menu', defaultValue: 0 }),
        draft: fields.checkbox({ label: 'Brouillon', defaultValue: false }),
        body: fields.mdx({ label: 'Contenu', extension: 'md' }),
      },
    }),
  },
  
  singletons: {
    site: singleton({
      label: 'Général',
      path: 'src/data/site',
      format: 'json',
      schema: {
        title: fields.text({ label: 'Titre du site' }),
        tagline: fields.text({ label: 'Slogan' }),
        description: fields.text({ label: 'Description' }),
        author: fields.text({ label: 'Auteur' }),
        email: fields.text({ label: 'Email' }),
        url: fields.text({ label: 'URL du site' }),
      },
    }),
    
    social: singleton({
      label: 'Réseaux sociaux',
      path: 'src/data/social',
      format: 'json',
      schema: {
        linkedin: fields.text({ label: 'LinkedIn' }),
        twitter: fields.text({ label: 'Twitter/X' }),
        github: fields.text({ label: 'GitHub' }),
        email: fields.text({ label: 'Email' }),
      },
    }),
    
    home: singleton({
      label: 'Accueil',
      path: 'src/data/home',
      format: 'json',
      schema: {
        eyebrow: fields.text({ label: "Texte d'accroche (ex: Parcours · projets · engagement · blog)" }),
        headline: fields.text({ label: 'Titre principal (ex: IT Officer)' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        showMap: fields.checkbox({ label: 'Afficher la carte', defaultValue: true }),
        showParcours: fields.checkbox({ label: 'Afficher Parcours', defaultValue: true }),
        showProjets: fields.checkbox({ label: 'Afficher Projets', defaultValue: true }),
        showEngagement: fields.checkbox({ label: 'Afficher Engagement', defaultValue: true }),
        showBlog: fields.checkbox({ label: 'Afficher Blog', defaultValue: true }),
      },
    }),
    
    seo: singleton({
      label: 'SEO',
      path: 'src/data/seo',
      format: 'json',
      schema: {
        defaultTitle: fields.text({ label: 'Titre par défaut' }),
        defaultDescription: fields.text({ label: 'Description par défaut' }),
        ogImage: fields.image({ label: 'Image OG', directory: 'public/uploads', publicPath: '/uploads/' }),
        twitter: fields.text({ label: 'Twitter (@username)' }),
        noIndex: fields.checkbox({ label: 'Ne pas indexer', defaultValue: false }),
      },
    }),
    
    footer: singleton({
      label: 'Footer',
      path: 'src/data/footer',
      format: 'json',
      schema: {
        copyright: fields.text({ label: 'Copyright ({year} pour année)' }),
        built_with: fields.text({ label: "Texte 'Construit avec'" }),
      },
    }),

    contactPage: singleton({
      label: 'Page Contact',
      path: 'src/data/contact',
      format: 'json',
      schema: {
        linkedInUrl: fields.text({ label: 'URL LinkedIn' }),
        heroEyebrow: fields.text({ label: 'Eyebrow hero' }),
        heroTitle: fields.text({ label: 'Titre hero' }),
        heroLead: fields.text({ label: 'Texte hero', multiline: true }),
        ctaLabel: fields.text({ label: 'Texte bouton' }),
        whyTitle: fields.text({ label: 'Titre carte 1' }),
        whyText: fields.text({ label: 'Texte carte 1', multiline: true }),
        fasterTitle: fields.text({ label: 'Titre carte 2' }),
        fasterItems: fields.array(fields.text({ label: 'Point' }), { label: 'Liste carte 2' }),
        profileTitle: fields.text({ label: 'Titre carte 3' }),
        profileText: fields.text({ label: 'Texte lien carte 3' }),
        profileHint: fields.text({ label: 'Texte aide carte 3' }),
      },
    }),

    engagementPage: singleton({
      label: 'Page Engagement',
      path: 'src/data/engagement',
      format: 'json',
      schema: {
        heroEyebrow: fields.text({ label: 'Eyebrow hero' }),
        heroTitle: fields.text({ label: 'Titre hero' }),
        heroLead: fields.text({ label: 'Texte hero', multiline: true }),
        timelineEyebrow: fields.text({ label: 'Eyebrow timeline' }),
        timelineTitle: fields.text({ label: 'Titre timeline' }),
        timeline: fields.array(
          fields.object({
            period: fields.text({ label: 'Période' }),
            title: fields.text({ label: 'Titre' }),
            text: fields.text({ label: 'Texte', multiline: true }),
            details: fields.array(fields.text({ label: 'Détail' }), { label: 'Détails' }),
          }),
          { label: 'Timeline' }
        ),
        spotlightEyebrow: fields.text({ label: 'Eyebrow focus' }),
        spotlightTitle: fields.text({ label: 'Titre focus' }),
        spotlightIntro: fields.text({ label: 'Intro focus', multiline: true }),
        spotlightCards: fields.array(
          fields.object({
            title: fields.text({ label: 'Titre carte' }),
            text: fields.text({ label: 'Texte carte', multiline: true }),
          }),
          { label: 'Cartes focus' }
        ),
        learningsEyebrow: fields.text({ label: 'Eyebrow apprentissages' }),
        learningsTitle: fields.text({ label: 'Titre apprentissages' }),
        learnings: fields.array(fields.text({ label: 'Apprentissage' }), { label: 'Apprentissages' }),
        workEyebrow: fields.text({ label: 'Eyebrow impact' }),
        workTitle: fields.text({ label: 'Titre impact' }),
        workParagraphs: fields.array(fields.text({ label: 'Paragraphe' }), { label: 'Paragraphes impact' }),
      },
    }),

    parcoursPage: singleton({
      label: 'Page Parcours',
      path: 'src/data/parcours',
      format: 'json',
      schema: {
        heroEyebrow: fields.text({ label: 'Eyebrow hero' }),
        heroTitle: fields.text({ label: 'Titre hero' }),
        heroLead: fields.text({ label: 'Texte hero', multiline: true }),
        heroLinkedinUrl: fields.text({ label: 'Lien LinkedIn' }),
        heroLinkedinLabel: fields.text({ label: 'Label lien LinkedIn' }),
        impactTitle: fields.text({ label: 'Titre impact' }),
        scopeTitle: fields.text({ label: 'Titre scope' }),
        timelineTitle: fields.text({ label: 'Titre timeline' }),
        stackTitle: fields.text({ label: 'Titre stack' }),
        indyStart: fields.object({
          year: fields.number({ label: 'Année début Indy' }),
          month: fields.number({ label: 'Mois début Indy' }),
        }, { label: 'Début Indy' }),
        quickStats: fields.array(
          fields.object({
            value: fields.text({ label: 'Valeur' }),
            label: fields.text({ label: 'Label' }),
          }),
          { label: 'Stats' }
        ),
        currentScope: fields.array(
          fields.object({
            title: fields.text({ label: 'Titre' }),
            text: fields.text({ label: 'Texte', multiline: true }),
          }),
          { label: 'Scope' }
        ),
        stack: fields.array(fields.text({ label: 'Outil' }), { label: 'Stack' }),
        experiences: fields.array(
          fields.object({
            role: fields.text({ label: 'Poste' }),
            company: fields.text({ label: 'Entreprise' }),
            contract: fields.text({ label: 'Contrat' }),
            start: fields.object({
              year: fields.number({ label: 'Année début' }),
              month: fields.number({ label: 'Mois début' }),
            }, { label: 'Début' }),
            end: fields.object({
              year: fields.number({ label: 'Année fin' }),
              month: fields.number({ label: 'Mois fin' }),
            }, { label: 'Fin' }),
            location: fields.text({ label: 'Lieu' }),
            mode: fields.text({ label: 'Mode' }),
            summary: fields.text({ label: 'Résumé', multiline: true }),
            highlights: fields.array(fields.text({ label: 'Point' }), { label: 'Highlights' }),
          }),
          { label: 'Expériences' }
        ),
      },
    }),

    projectsPage: singleton({
      label: 'Page Projets',
      path: 'src/data/projets',
      format: 'json',
      schema: {
        heroEyebrow: fields.text({ label: 'Eyebrow hero' }),
        heroTitle: fields.text({ label: 'Titre hero' }),
        heroLead: fields.text({ label: 'Texte hero', multiline: true }),
        sectionTitle: fields.text({ label: 'Titre section' }),
        projects: fields.array(
          fields.object({
            type: fields.text({ label: 'Type' }),
            name: fields.text({ label: 'Nom' }),
            startedAt: fields.text({ label: 'Date début (YYYY-MM-DD)' }),
            endedAt: fields.text({ label: 'Date fin (YYYY-MM-DD)' }),
            startPrecision: fields.select({
              label: 'Précision début',
              options: [
                { label: 'Mois', value: 'month' },
                { label: 'Année', value: 'year' },
              ],
              defaultValue: 'month',
            }),
            endPrecision: fields.select({
              label: 'Précision fin',
              options: [
                { label: 'Mois', value: 'month' },
                { label: 'Année', value: 'year' },
              ],
              defaultValue: 'month',
            }),
            status: fields.select({
              label: 'Statut',
              options: [
                { label: 'En cours', value: 'ongoing' },
                { label: 'Terminé', value: 'completed' },
              ],
              defaultValue: 'ongoing',
            }),
            url: fields.text({ label: 'URL projet' }),
            extensionUrl: fields.text({ label: 'URL extension' }),
            context: fields.text({ label: 'Contexte', multiline: true }),
            technique: fields.array(fields.text({ label: 'Point technique' }), { label: 'Technique' }),
            impact: fields.array(fields.text({ label: 'Point impact' }), { label: 'Impact' }),
            tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
          }),
          { label: 'Projets' }
        ),
      },
    }),
  },
});
