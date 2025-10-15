# Billing

## Configuration

Enable billing in `website.config.ts`:

```typescript
features: {
  BILLING: true,  // Enable billing
},
api: {
  FEATURE_BILLING: true,  // Enable billing API
}
```

Configure services:

```typescript
services: {
  autumnSecretKey: "your-secret-key",  // Autumn API key
}
```

## Feature Flags

Billing is controlled by the `BILLING` feature flag:
- `BILLING: true` - Shows billing page and components
- `FEATURE_BILLING: true` - Enables billing API endpoints

Wrap billing components:

```tsx
<Feature name="BILLING">
  <BillingPage />
</Feature>
```

## Access Control

- `/billing` requires authentication
- Protected by `authenticatedOnly` middleware
- Wrapped with `Feature` component

## Components

- `BillingOverview` - Main billing page
- `SubscriptionStatus` - Current subscription details
- `AvailablePlans` - Plan selection with current plan highlighting

## Data Sources

- Product config from `autumn.config.ts`
- Service URLs from `website.config.ts`
- Subscription data from Autumn API

## Environment Variables

Override config at runtime:
- `AUTUMN_SECRET_KEY`: Autumn API secret key

## Setup

1. Configure `autumnSecretKey` in `website.config.ts`
2. Define products in `autumn.config.ts`
3. Push config: `bun run autumn:push`
4. Wire checkout flows in `src/lib/stripe.ts`

## Common Issues

- **Page not showing**: Check `BILLING` and `FEATURE_BILLING` flags
- **No prices**: Configure products in `autumn.config.ts`
- **Auth errors**: Ensure user is signed in
- **Missing features**: Assign features to products in Autumn config
