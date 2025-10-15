# Database

## Overview

Uses Drizzle ORM with Cloudflare D1 database.

## Schema Files

- `worker/db/schema.ts` - Table definitions
- `worker/db/index.ts` - Database connection and exports

## Core Tables

**Authentication**
- `users` - User accounts with Autumn customer ID
- `sessions` - User sessions
- `accounts` - OAuth providers
- `verifications` - Email verification codes

**Billing**
- `subscriptions` - Subscription data linking to Autumn customers

## Usage

```typescript
import { db } from '@/worker/db';
import { users } from '@/worker/schema';

// Query users
const user = await db.select().from(users)
  .where(eq(users.id, userId))
  .get();

// Insert data
await db.insert(users).values({ name, email });
```

## Migrations

Generate migrations before deploying:

```bash
bun run pre-deploy  # Creates migration files
```

## Limitations

- Avoid complex JOIN queries - prefer separate queries
- No subqueries in D1
- Limited to 25MB per database

## Best Practices

- Use prepared statements for performance
- Keep queries simple and direct
- Use transactions for multi-table operations
- Index frequently queried columns
