import React, { Component } from "react";
import "./assets/sass/common.scss";
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import CasLoginScreen from "./components/login/CasLoginScreen";
import CasHomeScreen from "./components/home/CasHomeScreen";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlane,faPlaneArrival,faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

library.add(faPlane, faPlaneArrival,faPlaneDeparture);

class CasApp extends Component {
  

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
                <Redirect to="/login" />
          </Route>
          <Route path="/login" component={CasLoginScreen}/>
          <Route path="/home" component={CasHomeScreen}/>
        </Switch> 
      </BrowserRouter>
      
    );
  }
}

export default CasApp;
