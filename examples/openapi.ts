import { ResponseConfig } from '@asteasolutions/zod-to-openapi/dist/openapi-registry';
import { z } from '@hono/zod-openapi';

// Define the schema for GET response
export const actionsSpecOpenApiGetResponse: Record<string, ResponseConfig> = {
  '200': {
    description: 'Action GET 200 Response',
    content: {
      'application/json': {
        schema: z.object({
          icon: z.string(), // URL of the icon image
          label: z.string(), // Text for the button
          title: z.string(), // Title of the action
          description: z.string(), // Description of the action
          disabled: z.boolean().optional(), // Optional field to indicate if the action is disabled
          links: z.object({
            actions: z
              .array(
                z.object({
                  href: z.string(), // URL for the action
                  label: z.string(), // Text for the action button
                  parameters: z.array(
                    z.object({
                      name: z.string(), // Name of the parameter in the URL
                      label: z.string().optional(), // Placeholder for input, optional
                    })
                  ),
                })
              )
              .optional(), // Optional array of actions
          }),
          error: z.object({
            message: z.string(), // Error message to display to the user
          }).optional(), // Optional error object
        }),
      },
    },
  },
};

// Define the schema for POST request body
export const actionSpecOpenApiPostRequestBody = {
  content: {
    'application/json': {
      schema: z.object({
        account: z.string(), // Account identifier
      }),
    },
  },
};

// Define the schema for POST response
export const actionsSpecOpenApiPostResponse: Record<string, ResponseConfig> = {
  '200': {
    description: 'Action POST 200 Response',
    content: {
      'application/json': {
        schema: z.object({
          transaction: z.string(), // Base64-encoded serialized transaction
          message: z.string().optional(), // Optional message, e.g., item purchased
          redirect: z.string().optional(), // Optional redirect URL
        }),
      },
    },
  },
};
