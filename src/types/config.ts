// Configuration types for the application
// Shared between frontend and backend

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  ogImage: string;
  twitterHandle: string;

  // Contact and legal
  contact: {
    email: string;
    company: string;
    address: string;
  };

  legal: {
    privacyPolicy: string;
    termsOfService: string;
  };
}

export interface ServiceConfig {
  betterAuthUrl: string;
  autumnSecretKey: string;
}

export interface EnvironmentConfig {
  isDevelopment: boolean;
  isProduction: boolean;
}

// Unified feature flags - single source of truth for both frontend and backend
export interface FeatureFlags {
  // Authentication system
  AUTH: boolean;

  // Subscription and billing management
  BILLING: boolean;

  // Usage tracking and analytics
  USAGE: boolean;

  // Experimental features (disabled by default)
  EXPERIMENTAL: boolean;

  // Public API routes (always enabled by default)
  PUBLIC: boolean;
}

// Complete configuration interface
export interface AppConfig {
  site: SiteConfig;
  features: FeatureFlags;
  services: ServiceConfig;
  environment: EnvironmentConfig;
}

// Feature flag type exports
export type FeatureFlag = keyof FeatureFlags;

// Helper type for feature flag constraints
export interface FeatureConstraint {
  feature: FeatureFlag;
  requires: FeatureFlag[];
}

// Feature constraint definitions
export const FEATURE_CONSTRAINTS: FeatureConstraint[] = [];

// Helper function to check if a feature's dependencies are satisfied
export const areFeatureDependenciesSatisfied = (
  feature: FeatureFlag,
  enabledFeatures: Partial<FeatureFlags>
): boolean => {
  const constraint = FEATURE_CONSTRAINTS.find((c) => c.feature === feature);
  if (!constraint) return true;

  return constraint.requires.every((dep) => enabledFeatures[dep] === true);
};
