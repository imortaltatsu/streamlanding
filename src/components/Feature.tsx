import { ReactNode } from 'react';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { type FeatureFlag } from '../config/features';

interface FeatureProps {
  name: FeatureFlag;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Feature wrapper component for conditional rendering
 * Usage: <Feature name="CHAT"><ChatComponent /></Feature>
 * 
 * The component will only render its children if the feature is enabled.
 * Optionally provide a fallback to render when the feature is disabled.
 */
export function Feature({ name, children, fallback = null }: FeatureProps) {
  const isEnabled = useFeatureFlag(name);
  
  if (isEnabled) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
}
