import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./assets/styles/fonts.scss";
import "./assets/styles/font-faces.scss";
import "./assets/styles/margin.scss";
import "./assets/styles/flex.scss";
import "./assets/styles/gap.scss";
import "./assets/styles/padding.scss";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
