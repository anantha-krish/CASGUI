import React, { Component } from "react";
import CasTopbar from "../common/topbar/CasTopbar";
import CasMainMenu from "../common/menu/CasMainMenu";
import CasDashboard from "../dashboard/CasDashboard";
import {BrowserRouter as Router ,Route, Redirect, Switch} from 'react-router-dom';
import CasLoginScreen from "../login/CasLoginScreen";
import CasLoginUserProfile from '../common/userprofile/CasLoginUserProfile';
import CasFlightCreate from '../flightManagement/CasFlightCreate';
import CasFlightView from '../flightManagement/CasFlightView';
import CasReasonApproval from '../flightCancellation/CasReasonApproval';
import classNames from "classnames";
import CasFormDemo from "../dashboard/CasFormDemo";
import CasUploadFlightInfo from "../flightManagement/CasUploadFlightInfo";


class CasHomeScreen extends Component {

    constructor() {
      super();
      this.state = {
        staticMenuInactive: false,
        sharedObject:null
      };
      this.onToggleMenu = this.onToggleMenu.bind(this);
      this.setLogginStatus = this.setLogginStatus.bind(this);
    }

    onToggleMenu() {
      this.setState({
        staticMenuInactive: !this.state.staticMenuInactive,
      });
    }
  
    setLogginStatus(status){
      this.setState({
        loggedInStatus: status
      });
      sessionStorage.setItem('cas-gui-loggedIn',status)
    }
    render() {

      if(sessionStorage.getItem('cas-gui-loggedIn')){
          const menu = [
          {
            label: "Dashboard",
            icon: "pi pi-fw pi-home",
            to:'/home'
          },
          {
            label: "Flight Management",
            icon: " pi-fw ",
            items: [
              {
                label: "Create",
                icon: "pi pi-fw pi-plus",
                to:'/flight-info/add'
              },
              {
                label: "View",
                icon: "pi pi-fw pi-list",
                to:'/flight-info/all'
                
              },
              {
                label: "Upload",
                icon: "pi pi-fw pi-upload",
                to:'/flight-info/upload'
                
              },
            ],
          },
          {
            label: "Flight Cancellation",
            icon: " pi-fw ",
            items: [
              {
                label: "Reason Approval",
                icon: "pi pi-fw pi-bars",
                to:'/flight-cancellation/approval'
              }
            ],
          }
         
         
        ];
    
        const wrapperClass = classNames("layout-wrapper", "layout-static", {
          "layout-static-sidebar-inactive": this.state.staticMenuInactive,
        });
    
        const sidebarClassName = classNames("layout-sidebar layout-sidebar-dark");
        
        return (
          <div className={wrapperClass}>
           <Router>
            <CasTopbar onToggleMenu={this.onToggleMenu} staticMenuInactive={this.state.staticMenuInactive}/>
            <div className={sidebarClassName}>
              <CasLoginUserProfile/>
              <CasMainMenu model={menu} />
            </div>
          
            <div className="layout-main">
              <Switch>
            
              <Route path="/home"  component={CasDashboard}/>
              <Route path="/flight-info/all"  component={CasFlightView}/>
              <Route path="/flight-info/upload"   component={CasUploadFlightInfo} />
              <Route path="/flight-info/:mode/:id?"   component={CasFlightCreate} />
              <Route path="/flight-cancellation/approval"   component={CasReasonApproval} />
              </Switch>
            </div>
            </Router>
          </div>
        );

      } else {
        return(
          <div>
            <Router>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login"  render={(props) => (<CasLoginScreen onLogin={this.setLogginStatus} {...props}/>)} />
            <Redirect from="*" to="/login" /> 
            </Router>
          </div>
        );
      }
      
    }
  }
  
  export default CasHomeScreen;
