import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
  
const DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: "openid profile email" // Menambahkan scopes di sini

      }}
      cacheLocation="localstorage" // ✅ Simpan sesi di localStorage

    >

      <App />
    </Auth0Provider>
  </React.StrictMode>
);
