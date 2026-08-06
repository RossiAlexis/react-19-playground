import App from "./App";
import { createRoot } from "react-dom/client";
import AppWithTransition from "./AppWithTransitions";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
