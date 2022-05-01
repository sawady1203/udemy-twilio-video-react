import React from "react";
import { useState } from "react";
import "./App.css";
import Signin from "./components/Signin";

function App() {
  const [token, setToken] = useState();

  return (
    <div className="App">
      {!token ? <Signin setToken={setToken} /> : <h1>Hello from Twilio</h1>}
    </div>
  );
}

export default App;
