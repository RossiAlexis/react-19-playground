import AppWithDeferredValue from "./AppWithDeferredValue";
import AppWithoutDeferredValue from "./App";

import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<AppWithDeferredValue />);
// Uncomment to test the issue solved above.
// root.render(<AppWithoutDeferredValue />);
