// Feature flags configuration
// DEPRECATED: This file is maintained for backward compatibility
// New code should import from '../website.config.ts' instead

import { websiteConfig } from "../../website.config";
import type { FeatureFlag } from "../types/config";

// Re-export from centralized config
export const featureFlags = websiteConfig?.features || {
  AUTH: false,
  CHAT: false,
  BILLING: false,
  USAGE: false,
  EXPERIMENTAL: false,
  PUBLIC: true,
};

// Export type for backward compatibility
export type { FeatureFlag };

// Helper functions (maintained for backward compatibility)
export const isFeatureEnabled = (feature: FeatureFlag): boolean => {
  return featureFlags[feature];
};

export const getEnabledFeatures = (): FeatureFlag[] => {
  return Object.entries(featureFlags || {})
    .filter(([_, enabled]) => enabled)
    .map(([feature]) => feature as FeatureFlag);
};
