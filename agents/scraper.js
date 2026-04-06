// SCRAPER - Es el agente de búsqueda de Google Maps
// Busca negocios locales usando Apify por medio de Google Maps
// Filtra aquellos con sitio web y correo electrónico

require('dotenv').config();
const { ApifyClient } = require('apify-client');

/**
 * Se va a inicializar el cliente de Apify con la API key del .env
 */
const client = new ApifyClient({ token: process.env.APIFY_API_KEY });

/**
 * CONFIGURACIÓN DE BÚSQUEDA
 * keyword: Tipo de negocio a buscar
 * city: Ciudad objetivo
 * maxResults: Máximo de negocios/sesion
 * language: Idioma de búsqueda
 */
const SEARCH_CONFIG = {
  keyword: '',
  city: '',
  maxResults: 50,
  language: 'en',
};

/**
 * FUNCIÓN MAIN
 */
async function scrapeGoogleMaps(config = SEARCH_CONFIG) {
  console.log(`Iniciando búsqueda...`);
  console.log(`Buscando: "${config.keyword}" en ${config.city}`);
  console.log(`Máximo de resultados: ${config.maxResults}\n`);

  try {
    /**
     * Se va a llamar al actor de Apify
     */
    const run = await client.actor('compass/google-maps-scraper').call({
      searchStringsArray: [config.keyword],
      locationQuery: config.city,
      maxCrawledPlacesPerSearch: config.maxResults,
      language: config.language,
      includeWebsite: true,
      exportPlaceUrls: true,
    });

    /**
     * Se deben obtener los datos del dataset
     */
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    /**
     * Filtración y formateo en una sola cadena
     */
    const leads = items
      .filter(item => item.website && item.email)
      .map(item => ({
        name: item.title,
        website: item.website,
        email: item.email,
        phone: item.phone || null,
        address: item.address || null,
        rating: item.totalScore || null,
        reviews: item.reviewsCount || null,
      }));

    /**
     * Muestra de resúmenes
     */
    console.log(`Total encontrados: ${items.length}`);
    console.log(`Prospectos válidos: ${leads.length}\n`);

    return leads;

  } catch (error) {
    console.error(`Error en el scraper: ${error.message}`);
    throw error;
  }
}

/**
 * Se debe exportar para poder usarse en el orchestrator.js
 */
module.exports = { scrapeGoogleMaps, SEARCH_CONFIG };


