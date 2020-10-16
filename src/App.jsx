import React, { useState } from "react";
import "./assets/sass/common.scss";
import CasTopbar from "./components/common/topbar/CasTopbar";
import CasMainMenu from "./components/common/menu/CasMainMenu";
import CasUserProfile from "./components/common/userprofile/CasUserProfile";
import CasDashboard from "./components/dashboard/CasDashboard";
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
    {
      label: "Cancellation",
      icon: "pi pi-fw pi-times-circle",
      command: () => {
        window.location = "#/";
      },
      items: [
        {label: 'Reason Management', icon: 'pi pi-fw pi-bars',  command: () => {window.location = "#/";} },
      ]
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
      <CasTopbar onToggleMenu={onToggleMenu} />
      <div className={sidebarClassName}>
        <CasUserProfile />
        <CasMainMenu model={menu} />
      </div>
      <div className="layout-main">
        <CasDashboard/>
      </div>
    </div>
  );
}

export default App;
