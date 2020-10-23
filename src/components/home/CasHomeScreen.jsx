import React, { Component } from "react";
import CasTopbar from "../common/topbar/CasTopbar";
import CasMainMenu from "../common/menu/CasMainMenu";
import CasDashboard from "../dashboard/CasDashboard";
import { Route, Redirect} from 'react-router-dom';
import CasLoginScreen from "../login/CasLoginScreen";
import CasLoginUserProfile from '../common/userprofile/CasLoginUserProfile'
import CasFlightCreate from '../flightManagement/CasFlightCreate'
import classNames from "classnames";


class CasHomeScreen extends Component {

    constructor() {
      super();
      this.state = {
        staticMenuInactive: false,
        loggedInStatus:false,
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
            window.location = "#/home";
          },
        },
        {
          label: "Flight Management",
          icon: " pi-fw ",
          items: [
            {
              label: "Create",
              icon: "pi pi-fw pi-bars",
              to:'/flightCreate'
            },
            {
              label: "View",
              icon: "pi pi-fw pi-bars",
              command: () => {
                window.location = "#/";
              },
            },
            {
              label: "Update / Delete",
              icon: "pi pi-fw pi-bars",
              command: () => {
                window.location = "#/";
              },
            },
          ],
        },
        {
          label: "Main menu 1",
          icon: " pi-fw ",  
          command: () => {
            window.location = "#/";
          },
          items: [
            {
              label: "Submenu 1.1",
              icon: "pi pi-fw pi-bars",
              command: () => {
                window.location = "#/";
              },
            },
            {
              label: "Submenu 1.2",
              icon: "pi pi-fw pi-bars",
              command: () => {
                window.location = "#/";
              },
            },
            {
              label: "Submenu 1.n",
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
          <CasTopbar onToggleMenu={this.onToggleMenu} staticMenuInactive={this.state.staticMenuInactive}/>
          <div className={sidebarClassName}>
            <CasLoginUserProfile/>
            <CasMainMenu model={menu} />
          </div>
          <div className="layout-main">
            <Route exact path="/">
                  <Redirect to="/login" />
            </Route>
            <Route path="/login"  exact component={CasLoginScreen}/>
            <Route path="/home"  exact component={CasDashboard}/>
            <Route path="/flightCreate"  exact component={CasFlightCreate}/>
          
          </div>
        </div>
      );
    }
  }
  
  export default CasHomeScreen;
