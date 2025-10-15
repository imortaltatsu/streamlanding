# CONTEXT.md

## 🎯 Purpose

Entry point for agents/LLMs working in this repo. It provides a high-level overview and links to detailed instructions.

This base template uses:
- React + Vite + TailwindCSS + shadcn/ui
- Cloudflare Workers (Hono) for the API
- Drizzle ORM + D1 for data
- Bun as the package manager

Agents should extend this starter by:
1. **Configure site metadata** in `website.config.ts` (centralized configuration)
2. **Enable/disable features** with feature flags in `website.config.ts`
3. **Add reusable UI components** in `src/components/`
4. **Compose them into pages** under `src/pages/`
5. **Use semantic design tokens** for styling (no hard-coded colors)
6. **Include credentials** in requests to protected routes

## 📚 Instructions Hub

- **Codex Mode Quick Rules**
  - **Minimal Prompting**: Keep instructions short; remove preamble requests.
  - **Tools**: Prefer `apply_patch`; only run essential terminal commands.
  - **References**: Link to concise docs, avoid redundant explanations.

- Full instructions folder: ./instructions/
- Auth Cheatsheet: ./instructions/authentication.md
- Chatbot Guide: ./instructions/chatbot.md
- AI Gateway: ./instructions/ai-gateway.md
- Billing (Autumn): ./instructions/autumn.md (includes Better Auth integration, pricing flows, failed payment handling)
- Motion.dev Animations: ./instructions/motion.md (production-grade React animation library)

Use this file (CONTEXT.md) for orientation; jump into the instructions for task-specific guidance.

## 🚀 Quick Start for Agents

### 1. Configure Site Metadata
Edit `website.config.ts` at the root level to update:
- Site name, tagline, description
- Social media handles
- Contact information
- Feature flags (both frontend and API)

```typescript
// website.config.ts (root level)
export const defaultConfig: AppConfig = {
  site: {
    name: "Your App Name",
    tagline: "Your tagline",
    description: "Your description",
    ogImage: "/og-image.png",
    twitterHandle: "",
    contact: {
      email: "contact@example.com",
      company: "Your Company",
      address: "",
    },
    legal: {
      privacyPolicy: "/privacy",
      termsOfService: "/terms",
    },
  },
  features: {
    AUTH: true,        // Authentication system
    CHAT: false,       // AI chatbot (set to true to enable, needs AUTH)
    BILLING: true,     // Subscription management
    USAGE: true,       // Usage tracking
    EXPERIMENTAL: false, // Experimental features
    PUBLIC: true,      // Public API routes
  },
  services: {
    betterAuthUrl: "http://localhost:5173",
    autumnSecretKey: "",
    runableGatewayUrl: "http://localhost:8080/gateway/v1",
  },
  environment: {
    isDevelopment: true,
    isProduction: false,
  },
};
```

### 2. Enable/Disable Features
Edit `website.config.ts` to toggle components and API routes:

```typescript
// Edit features in website.config.ts
features: {
  AUTH: true,        // Authentication system
  CHAT: false,       // AI chatbot (disabled by default, needs AUTH)
  BILLING: true,     // Subscription management
  USAGE: true,       // Usage tracking
  EXPERIMENTAL: false, // Experimental features
  PUBLIC: true,      // Public API routes
}
```

### 3. Add Feature Components
Use the `Feature` wrapper to conditionally render components:

```tsx
import { Feature } from '@/components/Feature';

<Feature name="CHAT">
  <ChatComponent />
</Feature>
```

### 4. Update Navigation (if needed)
Guard navigation links with feature flags in `src/components/Header.tsx`:

```tsx
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

{useFeatureFlag('CHAT') && (
  <Link to="/chat">Chat</Link>
)}
```

## 🚩 Mandatory First Step

Before doing anything else, you MUST rewrite the placeholder page:
- `src/pages/home.tsx`
- `src/index.html`, modify the title accordingly
- Update site metadata in `website.config.ts` (root level)

**IMPORTANT**: Default to PREVIEW, not deploy. Use `bun run preview` for validation. Only deploy when explicitly requested/approved. When deploying, ALWAYS run `bun run pre-deploy` first (to generate migrations), then proceed with review.

## 🚀 Deployment Policy

- By default, do NOT deploy. Use preview builds locally and in PRs.
- Deployment is opt-in and requires explicit approval and environment readiness.
- Preconditions for deploy
  - `bun run pre-deploy` has generated migrations and they are reviewed.
  - Environment variables and bindings (e.g., D1) are configured.
  - Rollback plan is identified for schema changes.

## 🤖 Agent Priorities

### 0. 📝 Implementation Strategy
- **THIS TEMPLATE IS JUST BOILERPLATE** - You are allowed to completely revamp the design to match user requirements.
- Use semantic design tokens for all styling (no hard-coded colors)
- Feel free to modify any aspect: pages, navigation, blocks, layouts, themes, etc.
 - Rework the design tokens in `src/styles/global.css` to align with the user's brand or the task context; the default theme is a placeholder.

### 1. 🧩 Create Reusable Components First
- PREFER: Add/extend components in `src/components/` using shadcn/ui + Tailwind
- AVOID: Page-specific components unless they're small
- WHY: Components are composable, testable, reusable

### 2. 📄 Structure Pages with Components
- PREFER: Keep pages in `src/pages/` focused on layout and data flow
- First step: **Replace `src/pages/home.tsx` with your own version**
- PASS DATA: via serializable props (strings, numbers, booleans)
- WHY: Logic stays in reusable components

### 3. 📝 Implementation Strategy
1. Check if existing component can be configured
2. If not, create new component in `src/components/`
3. Wire component into relevant page(s)
4. Use consistent Tailwind styling with semantic tokens

### 4. 🚫 What NOT to do
- Don't introduce config systems/editors
- Don't use `dark:` variants or hard-coded colors; use tokens

## 📂 Project Structure

```
src/
├── components/ui/     → shadcn/ui components
├── components/        → App-level components
│   ├── billing/       → Billing-related components
│   ├── chat/          → Chat interface components
│   └── ui/            → Reusable UI components
├── pages/             → Page components
├── lib/               → Helpers and utilities
├── assets/            → Static assets (@assets/*)
├── styles/            → Global styles
├── config/            → Configuration modules
│   └── features.ts    → Feature flag definitions
├── contexts/          → React contexts
│   └── BillingContext.tsx → Billing state management
├── hooks/             → Custom React hooks
│   └── useFeatureFlag.ts → Feature flag utilities
├── types/             → TypeScript type definitions
│   └── config.ts      → Configuration types
├── config.ts          → Backward compatibility imports
├── app.tsx            → SPA router (React Router)
└── main.tsx           → Application entry point

worker/
├── index.ts           → Hono API endpoints
├── routes/            → Sub-routers
│   ├── auth-routes.ts → Authentication endpoints
│   ├── chat-routes.ts → Chat API endpoints
│   ├── billing-routes.ts → Billing endpoints
│   └── public-routes.ts → Public endpoints
├── middleware/        → Middlewares
│   └── auth.ts        → Authentication middleware
├── db/                → Database layer
│   ├── index.ts       → Database interface
│   ├── schema.ts      → DB schema definitions
│   └── auth-schema.ts → Authentication schema
├── auth.ts            → Authentication utilities
├── types.ts           → Worker TypeScript types
└── autumn.ts          → Autumn billing integration

instructions/
├── authentication.md  → Auth LLM cheatsheet
├── billing.md         → Billing setup guide
├── ai-gateway.md      → AI Gateway configuration
├── autumn.md          → Autumn billing platform
├── motion.md          → Motion.dev animation library
├── theming.md         → Theme customization
├── database.md        → Database setup
└── usage.md           → Usage tracking

Root Configuration Files:
├── website.config.ts  → Centralized configuration (features, services, branding)
├── autumn.config.ts   → Autumn billing configuration
├── components.json    → shadcn/ui configuration
└── package.json       → Dependencies and scripts
```

## 🧩 Creating New Components

1. Create file in `src/components/`
2. Define props interface
3. Export function component

```typescript
// Example component structure
interface ComponentProps {
  title: string;
  subtitle?: string;
  cta?: string;
}

export function ComponentName({ title, subtitle, cta }: ComponentProps) {
  return (
    <section className="py-20 text-center bg-accent text-accent-foreground">
      <h1 className="text-4xl font-bold">{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>}
      {cta && <Button className="mt-4">{cta}</Button>}
    </section>
  );
}
```

## 🛠️ Development Workflow

```bash
bun install           # Install dependencies
bun run dev           # Start dev server
# Default path: preview changes; do NOT deploy unless explicitly approved
bun run preview       # Preview production build (default), use bash with session, and system tool to expose the preview port
bun run pre-deploy    # Generate migrations (REQUIRED only before a deploy)
bun x shadcn@latest add <component>  # Add UI components
bun x tsc --noEmit -p ./tsconfig.app.json # Typecheck app
bun x tsc --noEmit -p ./tsconfig.worker.json # Typecheck worker
bun x tsc --noEmit -p ./tsconfig.node.json # Typecheck node
```

## 🔧 Feature Flag System

This template includes a centralized feature flag system for quickly enabling/disabling components and API routes:

### Configuration Location
All feature flags are configured in `website.config.ts` at the root level.

### Available Features

**Unified Features (Controls both frontend components and API routes):**
- `AUTH`: Authentication system (sign in/sign up) + auth API routes
- `CHAT`: AI chatbot functionality + chat API routes (requires AUTH enabled)
- `BILLING`: Subscription and billing management + billing API routes (requires AUTH enabled)
- `USAGE`: Usage tracking and analytics + usage API routes (requires AUTH enabled)
- `EXPERIMENTAL`: Experimental features and routes (disabled by default)
- `PUBLIC`: Public API routes (always enabled)

### Usage Examples

**Enable a chatbot:**
1. Set `CHAT: true` in `website.config.ts` features section
2. Ensure `AUTH: true` (CHAT requires AUTH)
3. Add route in `src/app.tsx`: `<Route path="/chat" element={<ChatPage />} />`
4. Wrap with feature flag: `<Feature name="CHAT"><ChatPage /></Feature>`
5. Add navigation link if needed

**Disable billing:**
1. Set `BILLING: false` in `website.config.ts` features section
2. All billing components and API routes will be hidden/disabled

### Worker-side Features
The worker checks environment variables first, then falls back to the centralized configuration. This allows runtime overrides via environment variables while maintaining sensible defaults.

When features are disabled, API endpoints return 503 Service Unavailable with a descriptive error message.

## 🧭 Pages & Routing (SPA)

- Pages: `src/pages/home.tsx`, `src/pages/sign-in.tsx`, `src/pages/sign-up.tsx`
- Routing: `src/app.tsx` (React Router)
- Navigation: Create navigation components as needed

> WARNING: `Home.tsx` is a placeholder intended only to demonstrate routing and layout. **You must rewrite this file before adding new routes or features.**

To add a page:
1. Create `src/pages/YourPage.tsx`
2. Add `<Route>` in `App.tsx`
3. Add navigation links as needed

## 🖼️ Assets

- Location: `src/assets/`
- Import: `import logo from "@assets/logo.svg"`
- CSS: `background: url("./assets/hero.jpg");`

### Asset Loading (production‑safe)

```ts
// utils/assets.ts
import rect55 from '@assets/rectangle-55.svg';
// import and map only what you use

export const ASSET_MAP = {
  'rectangle-55.svg': rect55,
} as const;

export function getAssetUrl(name: keyof typeof ASSET_MAP): string {
  return ASSET_MAP[name];
}

export function createBackgroundImageStyle(
  name: keyof typeof ASSET_MAP,
  options: { size?: string; position?: string; repeat?: string } = {}
): React.CSSProperties {
  const { size = 'cover', position = 'center', repeat = 'no-repeat' } = options;
  const url = getAssetUrl(name);
  return { backgroundImage: `url(${url})`, backgroundSize: size, backgroundPosition: position, backgroundRepeat: repeat };
}
```

Usage
```tsx
import { getAssetUrl, createBackgroundImageStyle } from '@/utils/assets';

// img src
<img src={getAssetUrl('rectangle-55.svg')} alt="..." />

// background image
<div style={createBackgroundImageStyle('rectangle-55.svg')} />
```

## ✅ Design Principles

- Composable over monolithic
- Schema-first with serializable props
- Consistent shadcn/ui + Tailwind styling
- Minimal state in components
- Semantic tokens only: use `bg-background`, `text-foreground`, `text-muted-foreground`,
  `bg-card`, `border-input`, `bg-primary`, `text-primary-foreground`, `bg-accent`, etc.
  Avoid literal color utilities (e.g., `text-slate-500`) and `dark:`.

## 🎨 Theming & Design Tokens

- **CSS-based Theming**: Design tokens and theme settings are configured in `src/styles/global.css`
- **IMPORTANT**: The default theme is only a starting point. You should customize it to fit the user's request or the task at hand.

- Theme customization checklist
  - Define brand palette in `src/styles/global.css` (primary, accent, background/foreground, muted, destructive)
  - Adjust radii, spacing, and shadows to the product's feel (e.g., compact vs. roomy)
  - Verify contrast and accessibility for all states (hover, focus, disabled)
  - Update examples/components to use tokens (no hard-coded colors)

- Design tokens live in `src/styles/global.css` as CSS custom properties
- Tailwind color tokens map to CSS variables using `@theme inline`
- To customize the theme, modify the CSS custom properties in `src/styles/global.css`

## 🔌 API Endpoints (Hono in `worker/`)

Authentication:
- Use `authenticatedOnly` middleware for protected routes
- Session/user are attached by `authMiddleware`
- See ./instructions/authentication.md for the full auth cheatsheet

Database:
- D1 datastore
- Bind as `D1` in `wrangler.jsonc`
- Authentication handled via Better Auth

## 💳 Billing (Autumn)

- Config: `autumn.config.ts` defines products and features.
- Docs: see `./instructions/autumn.md` for Better Auth integration, product setup, pricing flows, and failed payment handling.
- Env vars (Worker): `AUTUMN_API_KEY` (use Wrangler secrets for prod).
- Client: Use `autumn-js` on the frontend as needed; helpers live in `src/lib/stripe.ts` (temporarily repurposed for Autumn).

## 🤖 AI Chatbot (Reusable Component)

- **IMPORTANT**: If the user requests a chatbot or AI assistant, REUSE the existing chat components instead of building from scratch.
- Components: `src/components/chat/` (ChatContainer, ChatMessage, ChatInput, ChatSidebar, etc.)
- Page Example: `src/pages/chat.tsx`
- Backend: `worker/routes/chat-routes.ts`
- Integration: Vercel AI SDK 5 (`@ai-sdk/react`) + Runable AI Gateway
- Features: Streaming responses, multiple AI models (GPT-5, Claude 4), authentication, responsive design
- Docs: see `./instructions/chatbot.md` for complete implementation guide
- Quick Start: Add route to `/chat`, configure `RUNABLE_GATEWAY_SECRET`, and you're done!

## 🔐 Authentication Overview

- Library: Better Auth + Cloudflare adapter
- Base path: `/api/auth/*` (mounted in the Worker router)
- Session resolution: `authMiddleware` attaches `user` and `session` to the Hono context
- Protected routes: wrap with `authenticatedOnly`
- Client SDK: `src/lib/auth.ts` exports `authClient`
- Quickstart flows: sign up / sign in examples live in ./instructions/authentication.md under “Frontend Flows (Simple)”

## 📦 Database Migrations (Drizzle + D1)

Process:
1. Define schema in `worker/db/schema.ts`
2. Run `bun run pre-deploy` (generates migrations)
3. Call deploy tool only with explicit approval (applies migrations). Otherwise, stop at preview and do not deploy.

Error handling:
- If migrations fail, drop migration and repeat process

## ⚡ Realtime Features

- WebSockets: To implement
- Realtime updates: To implement
