import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import reducer, { initialState } from "./Reducer";
import { DataLayer } from "./DataLayer";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </StrictMode>
);
