"use client";

import "./LoginPage.css";
import { useState, FormEvent } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "/home";
    } else {
      alert("Skriv inn e-post og passord!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>MatBuddy</h1>
        <h2>Logg inn</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Logg inn</button>
        </form>

        <p>
          Har du ikke en konto?{" "}
          <a href="#" style={{ fontWeight: "bold", color: "#ffa726" }}>
            Registrer deg
          </a>
        </p>
      </div>
    </div>
  );
}
