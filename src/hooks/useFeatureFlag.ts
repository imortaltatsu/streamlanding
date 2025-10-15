// Feature flag hook
// DEPRECATED: This file is maintained for backward compatibility
// New code should import from '../website.config.ts' instead

import { featureFlags, isFeatureEnabled } from '../config/features';
import type { FeatureFlag } from '../types/config';

/**
 * React hook to check if a feature is enabled
 * Usage: const isEnabled = useFeatureFlag('CHAT');
 */
export function useFeatureFlag(feature: FeatureFlag): boolean {
  return isFeatureEnabled(feature);
}

/**
 * React hook to get all enabled features
 * Usage: const enabledFeatures = useEnabledFeatures();
 */
export function useEnabledFeatures(): FeatureFlag[] {
  return Object.entries(featureFlags || {})
    .filter(([, enabled]) => enabled)
    .map(([name]) => name as FeatureFlag);
}

/**
 * React hook to check multiple features at once
 * Usage: const { chatEnabled, billingEnabled } = useFeatureFlags({ CHAT: 'chatEnabled', BILLING: 'billingEnabled' });
 */
export function useFeatureFlags<T extends Record<FeatureFlag, string>>(
  mapping: T
): { [K in T[FeatureFlag]]: boolean } {
  const result = {} as { [K in T[FeatureFlag]]: boolean };
  
  for (const [feature, key] of Object.entries(mapping)) {
    result[key as T[FeatureFlag]] = isFeatureEnabled(feature as FeatureFlag);
  }
  
  return result;
}
