// Site metadata and configuration
// DEPRECATED: This file is maintained for backward compatibility
// New code should import from '../../website.config.ts' instead

import { websiteConfig } from '../website.config';

// NOTE: Backward compatibility maintained
// The existing `config` export below preserves all existing imports
// New code should prefer websiteConfig for better organization

// Re-export from centralized config
export const siteConfig = websiteConfig.site;

// Backward compatibility: keep existing exports
// DEPRECATED: Use websiteConfig instead for new code
export const config = {
  SITE_NAME: siteConfig.name,
  SITE_URL: import.meta.env.VITE_SITE_URL,
  API_BASE_URL: "/api",
  SITE_DESCRIPTION: siteConfig.description,
  SITE_TAGLINE: siteConfig.tagline,
  ogImage: siteConfig.ogImage,
  twitterHandle: siteConfig.twitterHandle,
  contact: siteConfig.contact,
  legal: siteConfig.legal,
};

export const featureFlags = websiteConfig.features;
