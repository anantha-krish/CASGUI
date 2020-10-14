import React from "react";
import "./assets/sass/common.scss";
import Topbar from "./components/common/topbar/Topbar";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Topbar/>
      <Dashboard/>
    </div>
  );
}

export default App;
