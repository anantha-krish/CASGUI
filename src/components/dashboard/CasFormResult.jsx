import React, { Component } from "react";
import { ObjectUtil } from "../../lib/libs";
import { UserService, AirportService } from "../../service/services";
import CasDataTable from "../common/datatable/CasDataTable";
import CasInputText from "../common/formfields/CasInputText";
import CasAirportInput from "../common/formfields/CasAirportInput";

class CasFormResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedResult: {}
    };
    this.handleResultSelection = this.handleResultSelection.bind(this);
  }

  handleResultSelection(event) {
    this.setState({ selectedResult: event.value });
  }

  render() {
    const renderColumns = [
      { field: "cancelType", header: "Type" },
      { field: "depDate", header: "Dep Date" },
      { field: "depAirport", header: "Dep Airport" },
      { field: "arvAirport", header: "Arv Airport" },
      { field: "flightNumber", header: "Flight No" },
      { field: "depTime", header: "Dep Time" },
      { field: "arvTime", header: "Arv Time" },
      { field: "reason", header: "Reason" },
      { field: "status", header: "Status" },
    ];
    let resultList=this.props.searchResults;
    return (
      <>
        <h1>Results</h1>
        { resultList.length !== 0 ? <CasDataTable
          data={resultList}
          selection={this.state.selectedResult}
          onSelectionChange={this.handleResultSelection}
          rows={10}
          columns={renderColumns} /> 
        :<div>No Info to display</div>}       
      </>
    );
  }
}

export default CasFormResult;
