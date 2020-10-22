import React, { Component } from "react";
import { ObjectUtil } from "../../lib/libs";
import { UserService, AirportService } from "../../service/services";
import CasDataTable from "../common/datatable/CasDataTable";
import CasInputText from "../common/formfields/CasInputText";
import CasAirportInput from "../common/formfields/CasAirportInput";

class CasFormResult extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      selectedResult: {},
      globalFilter: "",
    };
    this.handleResultSelection = this.handleResultSelection.bind(this);
  }

  handleResultSelection(event) {
    this.setState({ selectedResult: event.value });
  }

  render() {
    let renderColumns = [
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
    return (
      <>
        <h1>Results</h1>
        <CasDataTable
          data={this.state.results}
          selection={this.state.selectedResult}
          onSelectionChange={this.handleResultSelection}
          rows={10}
          columns={renderColumns}
        />
      </>
    );
  }
}

export default CasFormResult;
