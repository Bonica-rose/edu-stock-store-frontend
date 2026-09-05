import React from "react";
import ReactDOM from "react-dom/client";

import Providers from "./app/providers";
import App from "./app/App";

import { store } from "./app/store";
import { fetchCurrentUser } from "./features/auth/redux/authThunks";

import "./index.css";

async function bootstrap() {
  // Restore user session before rendering
  await store.dispatch(fetchCurrentUser());

  // In Future
  // if (store.getState().auth.isAuthenticated) {
  //   await Promise.all([
  //     store.dispatch(fetchSettings()),
  //     store.dispatch(fetchPermissions()),
  //   ]);
  // }

  ReactDOM.createRoot(document.getElementById("root")).render(
      <Providers>
        <App />
      </Providers>
  );
}

bootstrap();
