import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <Auth0Provider
      domain="YOUR_DOMAIN"
      clientId="YOUR_CLIENT_ID"
      redirect_uri={window.location.origin}
    >

    <App />
    </Auth0Provider>
  </React.StrictMode>
);
