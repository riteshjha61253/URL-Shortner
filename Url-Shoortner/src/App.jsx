import React, { useState } from "react";
import UserMode from "./components/user";
import AdminMode from "./components/admin";

function App() {
  const [mode, setMode] = useState("user");

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100vw" }}>
      <h1>URL Shortener</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setMode("user")}>User Mode</button>
        <button onClick={() => setMode("admin")}>Admin Mode</button>
      </div>

      {mode === "user" ? <UserMode /> : <AdminMode />}
    </div>
  );
}

export default App;
