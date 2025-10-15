import { Hono } from "hono";
import { createAuth } from "../auth";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.get("/usage/:userId", (c) => {
  const { userId } = c.req.param();

  const mockUsage = {
    projects: 3,
    storage: 768,
    apiCalls: 1425,
    userId,
  };

  return c.json(mockUsage);
});

app.all("/auth/*", async (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

export default app;
