import React, { Component } from "react";
import { CancellationService } from "../../service/services";
import CasUserList from "./CasUserList";

class CasDashboard extends Component {
  constructor() {
    super();
    this.state = {
      resultList: [],
    };
    this.setResult = this.setResult.bind(this);
    this.searchRequests = this.searchRequests.bind(this);
  }

  searchRequests() {
    //api call
    CancellationService.searchAllCancellationRequests(this.setResult);
  }

  setResult(resultJson) {
    this.setState({
      resultList: resultJson,
    });
  }

  render() {
    return (
      <div className="p-fluid">
        <div className="p-grid">
          <div className="p-col-12">
            <div className="card card-w-title">
              <CasUserList  />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CasDashboard;
