import React from "react";
import "./assets/sass/common.scss";
import Topbar from "./components/common/topbar/TopBar";
import Dashboard from "./components/dashboard/Dashboard";
import classNames from 'classnames';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function App() {
  const wrapperClass = classNames('layout-wrapper layout-static');

const sidebarClassName = classNames("layout-sidebar");
  return (
    <div className={wrapperClass}>
      <Topbar/>
      <div className="layout-main">
      <Dashboard/>
      </div>
    </div>
  );
}

export default App;
