import React, { Component } from "react";
import CasFileUpload from "../common/formfields/CasFileUpload";

export class CasUploadFlightInfo extends Component {
  constructor() {
    super();
    this.state = {
      errorText: "",
    };
  }
  render() {
    return (
      <div className="p-col-12">
        <div className="card card-w-title">
          <div className="p-grid upload-cas-flight">
            <div className="p-col-12">
              <h1>Upload Flight Information </h1>{" "}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="file">Browse Excel or CSV file</label>
                </div>
                <div className="p-col-12 p-lg-10">
                  <CasFileUpload
                    mode="basic"
                    auto={false}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    name="file"
                    url={"http://localhost:8080/cas-gui/flight-info/upload"}
                    onUpload={() => {
                      this.props.history.push("/flight-info/all");
                    }}
                    onError={() => {
                      this.setState({ errorText: "Unable to upload the file" });
                    }}
                  
                  />
                </div>
              </div>
              {this.state.errorText && (
                <div className="p-col-12 cas-inline-err-text p-d-block">
                  {this.state.errorText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CasUploadFlightInfo;
