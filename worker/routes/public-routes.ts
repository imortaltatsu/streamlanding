import { Hono } from "hono";
import autumn from "../../autumn.config";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

// Public, non-sensitive config for the frontend
app.get("/config", (c) => {
  return c.json({
    products: autumn.products,
    features: autumn.features,
  });
});

export default app;
