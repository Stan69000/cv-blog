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
        subheadline: fields.text({ label: 'Sous-titre' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        showMap: fields.checkbox({ label: 'Afficher la carte', defaultValue: true }),
        showParcours: fields.checkbox({ label: 'Afficher Parcours', defaultValue: true }),
        showProjets: fields.checkbox({ label: 'Afficher Projets', defaultValue: true }),
        showEngagement: fields.checkbox({ label: 'Afficher Engagement', defaultValue: true }),
        showBlog: fields.checkbox({ label: 'Afficher Blog', defaultValue: true }),
      },
    }),
    
    profile: singleton({
      label: 'Profil',
      path: 'src/data/profile',
      format: 'json',
      schema: {
        name: fields.text({ label: 'Nom' }),
        title: fields.text({ label: 'Titre/Poste' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        photo: fields.image({ label: 'Photo', directory: 'public/uploads', publicPath: '/uploads/' }),
        location: fields.text({ label: 'Localisation' }),
        experienceYears: fields.number({ label: "Années d'expérience" }),
        experienceLabel: fields.text({ label: "Texte expérience" }),
        skills: fields.array(
          fields.object({
            name: fields.text({ label: 'Nom' }),
            level: fields.number({ label: 'Niveau (0-100)' }),
          }),
          {
            label: 'Compétences',
            itemLabel: (props) => props.fields.name.value || 'Compétence',
          }
        ),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Valeur' }),
            label: fields.text({ label: 'Label' }),
          }),
          {
            label: 'Statistiques',
            itemLabel: (props) => props.fields.value.value || 'Stat',
          }
        ),
      },
    }),
    
    blogSettings: singleton({
      label: 'Paramètres Blog',
      path: 'src/data/blog',
      format: 'json',
      schema: {
        featuredLimit: fields.number({ label: 'Articles vedettes max', defaultValue: 3 }),
        showLibraryBooks: fields.checkbox({ label: 'Bibliothèque Livres', defaultValue: true }),
        showLibraryFloppies: fields.checkbox({ label: 'Bibliothèque Disquettes', defaultValue: true }),
        defaultType: fields.select({
          label: 'Type par défaut',
          options: [
            { label: 'Livre', value: 'book' },
            { label: 'Disquette', value: 'floppy' },
          ],
          defaultValue: 'book',
        }),
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
  },
});
