import { FileUpload } from "primereact/fileupload";
import React, { Component } from "react";
import { Toast } from 'primereact/toast';
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
    this.onBasicUpload = this.onBasicUpload.bind(this);
  }
  onBasicUpload() {
    this.toast.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
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
      <Toast ref={(el) => { this.toast = el; }}></Toast>
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
