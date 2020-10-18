import React, { Component } from "react";
import CasTopbar from "../common/topbar/CasTopbar";
import CasMainMenu from "../common/menu/CasMainMenu";
import CasDashboard from "../dashboard/CasDashboard";
import classNames from "classnames";


class CasHomeScreen extends Component {

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
      
      return (
        <div className={wrapperClass}>
          <CasTopbar onToggleMenu={this.onToggleMenu} />
          <div className={sidebarClassName}>
            <div className="layout-logo">
              <img alt="Logo" src={require('../../assets/images/CAS_Logo.png') } width="150" height="100" />
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
  
  export default CasHomeScreen;