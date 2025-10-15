# Autumn Billing

**Autumn owns Stripe integrations. Never call Stripe APIs directly. Keep Codex prompts minimal.**

## Quick Checklist

* **Auth enabled**: `website.config.ts` → `features.AUTH` must be `true`.
* **API key**: Collect Autumn TEST key → save as `AUTUMN_SECRET_KEY`.
* **Feature flags**: Enable `BILLING` and `FEATURE_BILLING`.
* **Config**: Update `services.autumnSecretKey` in `website.config.ts`.

```typescript
features: { BILLING: true },
api: { FEATURE_BILLING: true },
services: { autumnSecretKey: "AUTUMN_SECRET_KEY" }
```

## Product Setup (`autumn.config.ts`)

* **Features**: `feature({ id, type })` for boolean or metered access.
* **Prices**: `priceItem({ price, interval })` for base billing (cents).
* **Usage add-ons**: `pricedFeatureItem({ feature_id, price, billing_units, usage_model })`.

```typescript
export const messages = feature({ id: "messages", type: "metered" });

export const pro = product({
  id: "pro",
  items: [
    priceItem({ price: 2000, interval: "month" }),
    pricedFeatureItem({ feature_id: messages.id, price: 500, billing_units: 100, usage_model: "pay_per_use" }),
  ],
});
```

## Backend Hook (`worker/auth.ts`)

```typescript
import { autumn } from "autumn-js/better-auth";

export const auth = betterAuth({
  // existing config
  plugins: [autumn({ secretKey: env.AUTUMN_SECRET_KEY })],
});
```

## Frontend Wrapper (`src/main.tsx`)

```tsx
<AutumnProvider backendUrl="/api/auth" includeCredentials>
  <App />
</AutumnProvider>
```

Verify quickly:

```tsx
const { customer } = useCustomer();
console.log("Autumn customer", customer);
```

## Pricing Flows

* **Attach** customers to products:

```tsx
<Button onClick={async () => attach({ productId: "pro", dialog: ProductChangeDialog })}>
  Upgrade
</Button>
```

* **Dialog skeleton** (style as needed):

```tsx
const ProductChangeDialog = ({ open, setOpen, preview }: ProductChangeDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { attach } = useCustomer();

  const confirm = async () => {
    setLoading(true);
    await attach({ productId: preview.product_id });
    setOpen(false);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>{preview?.title}</DialogTitle>
        <div>{preview?.message}</div>
        {preview?.due_today?.price && <div>Due today: ${preview.due_today.price}</div>}
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={confirm} disabled={loading}>{loading ? "Processing..." : "Confirm"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
```

* **Gate features**:

```typescript
const premium = customer.products.find((p) => p.id === "pro");
```

* **Usage tracking**:

```tsx
if (allowed({ featureId: "messages" })) {
  await track({ featureId: "messages" });
  await refetch();
}
```

## Failed Payments

* Detect overdue: `customer.products.find((p) => p.status === "past_due")`.
* Route to billing portal:

```tsx
await openBillingPortal({ returnUrl: window.location.href });
```

## CLI Commands

```bash
npx atmn auth
npx atmn push
npx atmn push --prod
```

## Feature Flags

```tsx
<Feature name="BILLING">
  <BillingPage />
</Feature>
```

Frontend checks `BILLING`; worker checks `FEATURE_BILLING`.

## Files

* `autumn.config.ts`
* `worker/auth.ts`
* `src/main.tsx`
* `src/lib/stripe.ts`

## Common Issues

* **Auth disabled**: Turn on `features.AUTH`.
* **Missing customers**: Validate Better Auth session + `AUTUMN_SECRET_KEY`.
* **Unknown IDs**: Ask for explicit `productId` / `featureId`.
* **Usage stale**: Call `track()` then `refetch()`.
* **No products**: Run `npx atmn push`.
