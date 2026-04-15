import { defineConfig, collections, fields } from '@keystatic/core';

export default defineConfig({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collections.blog({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({ label: 'Titre', validation: { length: { min: 1 } } }),
        description: fields.text({ label: 'Description' }),
        pubDate: fields.date({ label: 'Date de publication', defaultTo: 'now' }),
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
        featured: fields.boolean({ label: 'En vedette', defaultValue: false }),
        draft: fields.boolean({ label: 'Brouillon', defaultValue: false }),
        heroImage: fields.image({ label: 'Image à la une', directory: 'public/uploads', publicPath: '/uploads/' }),
        body: fields.markdown({
          label: 'Contenu',
          formatting: true,
          image: true,
          links: true,
        }),
      },
    }),

    pages: collections.folder({
      label: 'Pages',
      path: 'src/content/pages/*',
      schema: {
        title: fields.text({ label: 'Titre', validation: { length: { min: 1 } } }),
        description: fields.text({ label: 'Description SEO' }),
        order: fields.number({ label: 'Ordre dans le menu', defaultValue: 0 }),
        draft: fields.boolean({ label: 'Brouillon', defaultValue: false }),
        body: fields.markdown({
          label: 'Contenu',
          formatting: true,
          image: true,
          links: true,
        }),
      },
    }),
  },
  
  singletons: {
    site: {
      label: 'Général',
      schema: {
        title: fields.text({ label: 'Titre du site' }),
        tagline: fields.text({ label: 'Slogan' }),
        description: fields.text({ label: 'Description' }),
        author: fields.text({ label: 'Auteur' }),
        email: fields.text({ label: 'Email' }),
        url: fields.text({ label: 'URL du site' }),
      },
    },
    
    social: {
      label: 'Réseaux sociaux',
      schema: {
        linkedin: fields.text({ label: 'LinkedIn', required: false }),
        twitter: fields.text({ label: 'Twitter/X', required: false }),
        github: fields.text({ label: 'GitHub', required: false }),
        email: fields.text({ label: 'Email', required: false }),
      },
    },
    
    home: {
      label: 'Accueil',
      schema: {
        headline: fields.text({ label: 'Titre principal' }),
        subheadline: fields.text({ label: 'Sous-titre' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        showMap: fields.boolean({ label: 'Afficher la carte', defaultValue: true }),
        showParcours: fields.boolean({ label: 'Afficher Parcours', defaultValue: true }),
        showProjets: fields.boolean({ label: 'Afficher Projets', defaultValue: true }),
        showEngagement: fields.boolean({ label: 'Afficher Engagement', defaultValue: true }),
        showBlog: fields.boolean({ label: 'Afficher Blog', defaultValue: true }),
      },
    },
    
    profile: {
      label: 'Profil',
      schema: {
        name: fields.text({ label: 'Nom' }),
        title: fields.text({ label: 'Titre/Poste' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        photo: fields.image({ label: 'Photo', directory: 'public/uploads', publicPath: '/uploads/' }),
        location: fields.text({ label: 'Localisation', required: false }),
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
    },
    
    blogSettings: {
      label: 'Paramètres Blog',
      schema: {
        featuredLimit: fields.number({ label: 'Articles vedettes max', defaultValue: 3 }),
        showLibraryBooks: fields.boolean({ label: 'Bibliothèque Livres', defaultValue: true }),
        showLibraryFloppies: fields.boolean({ label: 'Bibliothèque Disquettes', defaultValue: true }),
        defaultType: fields.select({
          label: 'Type par défaut',
          options: [
            { label: 'Livre', value: 'book' },
            { label: 'Disquette', value: 'floppy' },
          ],
          defaultValue: 'book',
        }),
      },
    },
    
    seo: {
      label: 'SEO',
      schema: {
        defaultTitle: fields.text({ label: 'Titre par défaut' }),
        defaultDescription: fields.text({ label: 'Description par défaut' }),
        ogImage: fields.image({ label: 'Image OG', directory: 'public/uploads', publicPath: '/uploads/' }),
        twitter: fields.text({ label: 'Twitter (@username)', required: false }),
        noIndex: fields.boolean({ label: 'Ne pas indexer', defaultValue: false }),
      },
    },
    
    footer: {
      label: 'Footer',
      schema: {
        copyright: fields.text({ label: 'Copyright ({year} pour année)' }),
        built_with: fields.text({ label: "Texte 'Construit avec'" }),
      },
    },
  },
});
