import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SoundProvider } from "react-sounds";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <SoundProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SoundProvider>
);
