// Use the non-React client to avoid hooks being evaluated at module load time
import { createAuthClient } from "better-auth/react"
// Stripe client removed; Autumn integration handled separately

export const authClient = createAuthClient({
  plugins: [],
})
