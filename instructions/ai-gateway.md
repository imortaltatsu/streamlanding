# AI Gateway

## Configuration

Configure AI Gateway in `website.config.ts`:

```typescript
services: {
  runableGatewayUrl: "http://localhost:8080/gateway/v1",
}
```

## Environment Variables

Override config at runtime:
- `RUNABLE_GATEWAY_URL`: AI Gateway URL
- `RUNABLE_GATEWAY_SECRET`: Gateway secret key

Set via Wrangler secrets:
```bash
wrangler secret put RUNABLE_GATEWAY_SECRET
wrangler secret put RUNABLE_GATEWAY_URL
```

## API Routes

Backend in `worker/routes/chat-routes.ts`:

**POST /api/chat** - Streaming chat completions
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ],
  "model": "gpt-5"
}
```

**GET /api/models** - Available AI models
```json
{
  "models": [
    { "id": "gpt-5", "name": "GPT-5", "provider": "openai" }
  ]
}
```

## Supported Models

- `gpt-5` - Latest GPT model
- `gpt-5-codex` - Code generation
- `gpt-5-mini` - Faster, cost-effective
- `claude-4` - Advanced Claude model
- `claude-4.5-sonnet` - Latest Claude Sonnet

## Frontend Integration

Use AI SDK 5 with `useChat` hook:

```typescript
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

const { messages, sendMessage, status } = useChat({
  transport: new DefaultChatTransport({ api: '/api/chat' }),
});

// Send message
await sendMessage({ text: "Hello!" });
```

## Authentication

All endpoints require authentication via `authenticatedOnly` middleware.

## Features

- **Streaming responses** - Real-time text streaming
- **Usage tracking** - Automatic token counting
- **Multiple models** - OpenAI and Anthropic support
- **Error handling** - Graceful degradation

## Common Issues

- **"Gateway not configured"**: Set `RUNABLE_GATEWAY_SECRET`
- **No streaming**: Check authentication and console errors
- **Model not found**: Verify model ID matches supported models
