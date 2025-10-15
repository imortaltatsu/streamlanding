# Authentication

## Configuration

Authentication is controlled by unified feature flags in `website.config.ts`:

```typescript
features: {
  AUTH: true,  // Enable auth components + auth API routes
}
```

Service URLs are configured in the `services` section:

```typescript
services: {
  betterAuthUrl: "http://localhost:5173",  // Auth service URL
}
```

## Feature Flag Usage

Wrap auth components with the `Feature` wrapper:

```tsx
<Feature name="AUTH">
  <SignInPage />
</Feature>
```

Guard navigation with feature flags:

```tsx
{useFeatureFlag('AUTH') && (
  <Link to="/sign-in">Sign In</Link>
)}
```

## Environment Variables

Override config at runtime:
- `VITE_BETTER_AUTH_URL`: Auth service URL
- `BETTER_AUTH_SECRET`: Auth secret key

## API Methods

**Sign Up**
- Client: `authClient.signUp.email({ email, password, name })`
- Server: `auth.api.signUpEmail({ body: { email, password, name } })`

**Sign In**
- Client: `authClient.signIn.email({ email, password })`
- Server: `auth.api.signInEmail({ body: { email, password }, headers })`

**Password Reset**
- Send link: `authClient.requestPasswordReset({ email, redirectTo })`
- Complete reset: `authClient.resetPassword({ newPassword, token })`

## Middleware

- `authMiddleware`: attaches `user` and `session` to context
- `authenticatedOnly`: returns 401 when session is missing

Usage pattern in `worker/index.ts`:
```typescript
app.use("*", authMiddleware)
// Guard routes with authenticatedOnly
```

## Session Access

After `authMiddleware` runs:
- `c.get('user')`: current user
- `c.get('session')`: current session

## Routes

- `GET /api/me`: returns current user (protected)
- `GET /api/protected`: example protected endpoint
- `ALL /api/auth/*`: handled by Better Auth

## Quick Start

1. Set `AUTH: true` in `website.config.ts` features section
2. Configure `betterAuthUrl` in `services` section
3. Wrap auth pages with `<Feature name="AUTH">`
4. Add navigation links with `useFeatureFlag('AUTH')`

## Common Issues

- **Auth pages not showing**: Check AUTH feature flag is enabled in `website.config.ts`
- **Auth API routes not working**: Verify AUTH feature flag controls both frontend and backend
- **Auth service not responding**: Verify `betterAuthUrl` configuration in services section
- **401 errors**: Ensure cookies and credentials are sent with requests
- **Missing tables**: Run `bun run pre-deploy` before deploying to generate migrations
- **Feature flags not working**: Check that `website.config.ts` is properly exported and imported
