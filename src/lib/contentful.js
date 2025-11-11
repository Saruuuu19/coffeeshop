import * as contentful from 'contentful';

// Astro usa import.meta.env para acceder a las variables del .env
const client = contentful.createClient({
  // Las claves son inyectadas aquí desde el archivo .env
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

export default client;