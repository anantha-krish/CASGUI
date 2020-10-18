import React, { Component } from "react";
import "./assets/sass/common.scss";
import CasTopbar from "./components/common/topbar/CasTopbar";
import CasMainMenu from "./components/common/menu/CasMainMenu";
import CasDashboard from "./components/dashboard/CasDashboard";
import classNames from "classnames";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class CasApp extends Component {

  constructor() {
    super();
    this.state = {
      staticMenuInactive: false,
    };
    this.onToggleMenu = this.onToggleMenu.bind(this);
  }

  onToggleMenu(event) {
    this.setState({
      staticMenuInactive: !this.state.staticMenuInactive,
    });
  }

  render() {
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
          {
            label: "Reason Management",
            icon: "pi pi-fw pi-bars",
            command: () => {
              window.location = "#/";
            },
          },
        ],
      },
    ];

    const wrapperClass = classNames("layout-wrapper", "layout-static", {
      "layout-static-sidebar-inactive": this.state.staticMenuInactive,
    });

    const sidebarClassName = classNames("layout-sidebar layout-sidebar-dark");
    const logo = 'assets/images/CAS_Logo.png';

    return (
      <div className={wrapperClass}>
        <CasTopbar onToggleMenu={this.onToggleMenu} />
        <div className={sidebarClassName}>
          <div className="layout-logo">
            <img alt="Logo" src={logo} width="150" height="100" />
          </div>
          <CasMainMenu model={menu} />
        </div>
        <div className="layout-main">
          <CasDashboard />
        </div>
      </div>
    );
  }
}

export default CasApp;
