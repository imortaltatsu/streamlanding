import { autumn } from "autumn-js/better-auth";
import { betterAuth } from "better-auth";
import { withCloudflare } from "better-auth-cloudflare";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import { getServiceConfig } from "../website.config";
import * as schema from "./db/schema";
// No Stripe client required

function createAuth(env?: Cloudflare.Env, cf?: IncomingRequestCfProperties) {
  // Use actual DB for runtime, empty object for CLI
  const db = env ? drizzle(env.D1, { schema, logger: true }) : ({} as any);

  // Get service configuration
  const services = getServiceConfig();
  const betterAuthUrl = env?.VITE_BETTER_AUTH_URL || services.betterAuthUrl;

  return betterAuth({
    ...withCloudflare(
      {
        autoDetectIpAddress: true,
        geolocationTracking: true,
        cf: cf || {},
        d1:
          env ?
            {
              db,
              options: {
                usePlural: true,
                debugLogs: false,
              },
            }
          : undefined,
      },
      {
        trustedOrigins: [
          betterAuthUrl,
        ],
        emailAndPassword: {
          enabled: true,
        },
        rateLimit: {
          enabled: true,
        },
        baseURL: betterAuthUrl,
        secret: process.env.BETTER_AUTH_SECRET || "dev-secret-change-me",
        plugins: [autumn()],
      }
    ),
    // Only add database adapter for CLI schema generation
    ...(env ?
      {}
    : {
        database: drizzleAdapter({} as D1Database, {
          provider: "sqlite",
          usePlural: true,
          // debugLogs: true,
        }),
      }),
  });
}

// Export for CLI schema generation
export const auth = createAuth();

// Export for runtime usage
export { createAuth };
