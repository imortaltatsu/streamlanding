import { createContext, useContext, ReactNode } from 'react';
import type { SubscriptionWithDetails } from '@/lib/stripe';

interface BillingContextType {
  subscription: SubscriptionWithDetails | null;
  loading?: boolean;
  error?: string | null;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

interface BillingProviderProps {
  children: ReactNode;
  subscription: SubscriptionWithDetails | null;
  loading?: boolean;
  error?: string | null;
}

export function BillingProvider({ 
  children, 
  subscription, 
  loading, 
  error 
}: BillingProviderProps) {
  return (
    <BillingContext.Provider value={{ subscription, loading, error }}>
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const context = useContext(BillingContext);
  if (context === undefined) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
}
