import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "@/app/providers/AppProvider";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { AppRouter } from "@/app/router/AppRouter";
import "@/design-system/styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Elemento raiz da aplicação não encontrado.");
createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>,
);
