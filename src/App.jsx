import React, { useState } from "react";
import "./assets/sass/common.scss";
import Topbar from "./components/common/topbar/Topbar";
import AppMenu from "./components/common/menu/AppMenu";
import UserProfile from "./components/common/userprofile/UserProfile";
import Dashboard from "./components/dashboard/Dashboard";
import classNames from "classnames";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  const [staticMenuInactive, setstaticMenuInactive] = useState(false);

  const menu = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location = "#/";
      },
    },
  ];

  const onToggleMenu = (event) => {
    setstaticMenuInactive(!staticMenuInactive);
  };
  const wrapperClass = classNames("layout-wrapper", "layout-static", {
    "layout-static-sidebar-inactive": staticMenuInactive,
  });

  const sidebarClassName = classNames("layout-sidebar layout-sidebar-dark");
  return (
    <div className={wrapperClass}>
      <Topbar onToggleMenu={onToggleMenu} />
      <div className={sidebarClassName}>
        <UserProfile />
        <AppMenu model={menu} />
      </div>
      <div className="layout-main">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
