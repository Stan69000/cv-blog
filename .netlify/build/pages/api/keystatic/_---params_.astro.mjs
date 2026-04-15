import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config as config$1, singleton, fields, collection } from '@keystatic/core';
export { renderers } from '../../../renderers.mjs';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const config = config$1({
  storage: {
    kind: "github",
    repo: "Stan69000/cv-blog"
  },
  collections: {
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "body" },
      schema: {
        title: fields.text({ label: "Titre", validation: { length: { min: 1 } } }),
        description: fields.text({ label: "Description" }),
        pubDate: fields.date({ label: "Date de publication", defaultTo: "now" }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Livre", value: "book" },
            { label: "Disquette", value: "floppy" }
          ],
          defaultValue: "book"
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value
        }),
        featured: fields.boolean({ label: "En vedette", defaultValue: false }),
        draft: fields.boolean({ label: "Brouillon", defaultValue: false }),
        heroImage: fields.image({ label: "Image à la une", directory: "public/uploads", publicPath: "/uploads/" }),
        body: fields.markdown({
          label: "Contenu",
          formatting: true,
          image: true,
          links: true
        })
      }
    }),
    pages: collection.folder({
      label: "Pages",
      path: "src/content/pages/*",
      schema: {
        title: fields.text({ label: "Titre", validation: { length: { min: 1 } } }),
        description: fields.text({ label: "Description SEO" }),
        order: fields.number({ label: "Ordre dans le menu", defaultValue: 0 }),
        draft: fields.boolean({ label: "Brouillon", defaultValue: false }),
        body: fields.markdown({
          label: "Contenu",
          formatting: true,
          image: true,
          links: true
        })
      }
    })
  },
  singletons: {
    site: singleton({
      label: "Général",
      schema: {
        title: fields.text({ label: "Titre du site" }),
        tagline: fields.text({ label: "Slogan" }),
        description: fields.text({ label: "Description" }),
        author: fields.text({ label: "Auteur" }),
        email: fields.text({ label: "Email" }),
        url: fields.text({ label: "URL du site" })
      }
    }),
    social: singleton({
      label: "Réseaux sociaux",
      schema: {
        linkedin: fields.text({ label: "LinkedIn", required: false }),
        twitter: fields.text({ label: "Twitter/X", required: false }),
        github: fields.text({ label: "GitHub", required: false }),
        email: fields.text({ label: "Email", required: false })
      }
    }),
    home: singleton({
      label: "Accueil",
      schema: {
        headline: fields.text({ label: "Titre principal" }),
        subheadline: fields.text({ label: "Sous-titre" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        showMap: fields.boolean({ label: "Afficher la carte", defaultValue: true }),
        showParcours: fields.boolean({ label: "Afficher Parcours", defaultValue: true }),
        showProjets: fields.boolean({ label: "Afficher Projets", defaultValue: true }),
        showEngagement: fields.boolean({ label: "Afficher Engagement", defaultValue: true }),
        showBlog: fields.boolean({ label: "Afficher Blog", defaultValue: true })
      }
    }),
    profile: singleton({
      label: "Profil",
      schema: {
        name: fields.text({ label: "Nom" }),
        title: fields.text({ label: "Titre/Poste" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        photo: fields.image({ label: "Photo", directory: "public/uploads", publicPath: "/uploads/" }),
        location: fields.text({ label: "Localisation", required: false }),
        experienceYears: fields.number({ label: "Années d'expérience" }),
        experienceLabel: fields.text({ label: "Texte expérience" }),
        skills: fields.array(
          fields.object({
            name: fields.text({ label: "Nom" }),
            level: fields.number({ label: "Niveau (0-100)" })
          }),
          {
            label: "Compétences",
            itemLabel: (props) => props.fields.name.value || "Compétence"
          }
        ),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: "Valeur" }),
            label: fields.text({ label: "Label" })
          }),
          {
            label: "Statistiques",
            itemLabel: (props) => props.fields.value.value || "Stat"
          }
        )
      }
    }),
    blogSettings: singleton({
      label: "Paramètres Blog",
      schema: {
        featuredLimit: fields.number({ label: "Articles vedettes max", defaultValue: 3 }),
        showLibraryBooks: fields.boolean({ label: "Bibliothèque Livres", defaultValue: true }),
        showLibraryFloppies: fields.boolean({ label: "Bibliothèque Disquettes", defaultValue: true }),
        defaultType: fields.select({
          label: "Type par défaut",
          options: [
            { label: "Livre", value: "book" },
            { label: "Disquette", value: "floppy" }
          ],
          defaultValue: "book"
        })
      }
    }),
    seo: singleton({
      label: "SEO",
      schema: {
        defaultTitle: fields.text({ label: "Titre par défaut" }),
        defaultDescription: fields.text({ label: "Description par défaut" }),
        ogImage: fields.image({ label: "Image OG", directory: "public/uploads", publicPath: "/uploads/" }),
        twitter: fields.text({ label: "Twitter (@username)", required: false }),
        noIndex: fields.boolean({ label: "Ne pas indexer", defaultValue: false })
      }
    }),
    footer: singleton({
      label: "Footer",
      schema: {
        copyright: fields.text({ label: "Copyright ({year} pour année)" }),
        built_with: fields.text({ label: "Texte 'Construit avec'" })
      }
    })
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
