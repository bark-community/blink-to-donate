import { serve } from '@hono/node-server';
import donate from './donate/route';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';

const app = new OpenAPIHono();

// Apply CORS middleware
app.use(
  cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'Authorization', 'Accept-Encoding'],
    allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  }),
);

// <--Actions-->
app.route('/api/donate', donate);
// </--Actions-->

// Configure OpenAPI documentation
app.doc('/doc', {
  info: {
    title: 'An API',
    version: 'v1',
  },
  openapi: '3.1.0',
});

// Set up Swagger UI to serve OpenAPI documentation
app.get(
  '/swagger-ui',
  swaggerUI({
    url: '/doc',
  }),
);

const port = 3000;
console.log(
  `Server is running on port ${port}
Visit http://localhost:${port}/swagger-ui to explore existing actions
Visit https://dial.to to unfurl action into a Blink
`,
);

// Start the server
serve({
  fetch: app.fetch,
  port,
});
