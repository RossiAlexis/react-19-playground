import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";

import "doodle.css/doodle.css";

console.log("Fetching flight response");

const fetchPromise = fetch("/react-flight");

const root = createRoot(document.getElementById("root"));
const p = createFromFetch(fetchPromise);

console.log("Rendering root", p);
root.render(p);
