import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./app.tsx";
import "./styles/global.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AutumnProvider } from "autumn-js/react";
import { getServiceConfig } from "../website.config";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AutumnProvider betterAuthUrl={import.meta.env.VITE_BETTER_AUTH_URL || getServiceConfig().betterAuthUrl}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AutumnProvider>
    </ThemeProvider>
  </StrictMode>
);
