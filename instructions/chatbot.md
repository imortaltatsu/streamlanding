# AI Chatbot

## Quick Start

Enable chat in `website.config.ts`:

```typescript
features: {
  CHAT: true,  // Enable chatbot
},
api: {
  FEATURE_CHAT: true,  // Enable chat API
}
```

Configure AI Gateway:

```typescript
services: {
  runableGatewayUrl: "http://localhost:8080/gateway/v1",
}
```

Add route to `src/app.tsx`:

```tsx
<Route path="/chat" element={
  <Feature name="CHAT">
    <ChatPage />
  </Feature>
} />
```

## Feature Flags

Chat is controlled by the `CHAT` feature flag:
- `CHAT: true` - Shows chat components and routes
- `FEATURE_CHAT: true` - Enables chat API endpoints

Guard navigation:

```tsx
{useFeatureFlag('CHAT') && (
  <Link to="/chat">Chat</Link>
)}
```

## Components

Core components in `src/components/chat/`:
- `ChatContainer` - Main layout with sidebar
- `ChatMessage` - Individual message display
- `ChatInput` - Message input with send button
- `MessageContent` - Markdown rendering

Page wrapper in `src/pages/chat.tsx` with AI SDK integration.

## API

Backend in `worker/routes/chat-routes.ts`:
- `POST /api/chat` - Streaming chat completions
- `GET /api/models` - Available AI models

Requires authentication via `authenticatedOnly` middleware.

## Customization

**Change model** in `src/pages/chat.tsx`:

```typescript
useChat({
  body: {
    model: 'claude-4', // or 'gpt-5', 'gpt-5-mini'
  },
});
```

**Add system prompt** in `worker/routes/chat-routes.ts`:

```typescript
const systemMessage = {
  role: 'system',
  content: 'You are a helpful assistant...'
};
const allMessages = [systemMessage, ...messages];
```

**Custom welcome message** in `ChatContainer.tsx`:

```typescript
<h2 className="mb-4 text-3xl font-bold">Your Welcome</h2>
<p className="mb-8 text-muted-foreground">Your description</p>
```

## Environment Variables

Override config at runtime:
- `RUNABLE_GATEWAY_URL`: AI Gateway URL
- `RUNABLE_GATEWAY_SECRET`: Gateway secret key

## Common Issues

- **"AI Gateway not configured"**: Set environment variables and restart dev server
- **Messages not streaming**: Check authentication and console errors
- **Chat not showing**: Verify `CHAT` and `FEATURE_CHAT` flags are enabled
