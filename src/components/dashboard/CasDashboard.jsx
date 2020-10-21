import React, { Component } from "react";
import CasFormDemo from "./CasFormDemo";
import CasUserList from './CasUserList'


class CasDashboard extends Component {
 
  render() {
    return (
      <div>
        <CasFormDemo/>
        <CasUserList/>
      </div>
    );
  }
}

export default CasDashboard;
