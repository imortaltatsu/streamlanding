
// Website Configuration
// Central place for all website settings, feature flags, and environment-specific values
// This file replaces scattered environment variables with a single source of truth

import type { AppConfig, FeatureFlag } from './src/types/config';
import { areFeatureDependenciesSatisfied } from './src/types/config';

// Default configuration
export const defaultConfig: AppConfig = {
  site: {
    name: "Agentic Streamers by YeetLabs",
    tagline: "YeetLabs-born Rick and Morty AI streams on pump.fun",
    description:
      "Agentic Streamers by YeetLabs warps you into a neon Rick and Morty multiverse where interdimensional AI broadcasts and pump.fun market chaos converge in real time.",
    ogImage: "/og-image.png",
    twitterHandle: "yeetlabs",

    contact: {
      email: "support@yeetlabs.ai",
      company: "YeetLabs",
      address: "Quantum Hub, Dimension C-137",
    },

    legal: {
      privacyPolicy: "/privacy",
      termsOfService: "/terms",
    },
  },

  features: {
    AUTH: false, // Authentication system (disabled by default)
    BILLING: false, // Subscription management (disabled by default, needs AUTH enabled)
    USAGE: false, // Usage tracking (disabled by default, needs AUTH enabled)
    EXPERIMENTAL: false, // Experimental features (disabled by default)
    PUBLIC: true, // Public API routes (always enabled)
  },

  services: {
    betterAuthUrl: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173",
    autumnSecretKey: "",
  },

  environment: {
    isDevelopment: true,
    isProduction: false,
  },
};

// Environment-specific overrides
const createConfig = (): AppConfig => {
  const isDevelopment =
    process.env.NODE_ENV === "development" ||
    (typeof globalThis !== "undefined" &&
      typeof (globalThis as any).window !== "undefined" &&
      (globalThis as any).window.location.hostname === "localhost");
  const isProduction = !isDevelopment;

  return {
    ...defaultConfig,

    // Override for production
    ...(isProduction && {
      site: {
        ...defaultConfig.site,
      },
      services: {
        ...defaultConfig.services,
        betterAuthUrl:
          process.env.VITE_BETTER_AUTH_URL ||
          import.meta.env.VITE_BETTER_AUTH_URL ||
          process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://stream.yeetlabs.fun",
        autumnSecretKey:
          process.env.AUTUMN_SECRET_KEY ||
          defaultConfig.services.autumnSecretKey,
      },
      environment: {
        isDevelopment: false,
        isProduction: true,
      },
    }),
  };
};

// Export the active configuration
export const websiteConfig = createConfig();

// Helper functions for common use cases
export const getSiteConfig = () => websiteConfig.site;
export const getFeatureFlags = () => websiteConfig.features;
export const getServiceConfig = () => websiteConfig.services;
export const isFeatureEnabled = (feature: FeatureFlag): boolean => {
  const isEnabled = websiteConfig.features[feature];
  
  // Check feature dependencies
  if (isEnabled && !areFeatureDependenciesSatisfied(feature, websiteConfig.features)) {
    return false;
  }
  
  return isEnabled;
};

// Type exports
export type { FeatureFlag } from './src/types/config';

// Legacy exports for backward compatibility
export const siteConfig = websiteConfig.site;
export const featureFlags = websiteConfig.features;
