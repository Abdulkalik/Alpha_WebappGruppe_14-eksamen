import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { Login } from "./app/pages/LoginPage";
import { Home } from "./app/pages/Home";
import { Recipes } from "./app/pages/Recipes";
import { Favorites } from "./app/pages/Favorites";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

function App() {
  const path = window.location.pathname;

  if (path === "/home") {
    return <Home />;
  }

  if (path === "/recipes") {
    return <Recipes />;
  }

  if (path === "/favorites") {
    return <Favorites />;
  }

  
  return <Login />;
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
