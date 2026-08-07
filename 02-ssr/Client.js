import { hydrateRoot } from "react-dom/client";
import { createElement as h } from "react";
import App from "./App";

hydrateRoot(document.getElementById("root"), h(App));
