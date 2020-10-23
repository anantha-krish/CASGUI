import React, { Component } from "react";
import "./assets/sass/common.scss";
import CasHomeScreen from "./components/home/CasHomeScreen";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlane,faPlaneArrival,faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

library.add(faPlane, faPlaneArrival,faPlaneDeparture);

class CasApp extends Component {
  render() {
    return (<CasHomeScreen/>);
  }
}

export default CasApp;
