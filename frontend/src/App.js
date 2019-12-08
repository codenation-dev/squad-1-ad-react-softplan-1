import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Header } from "./components/Header"
import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <Routes />
    </BrowserRouter>
  );
}

export default App;