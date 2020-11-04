import { FileUpload } from 'primereact/fileupload'
import React, { Component } from 'react'
import CasFileUpload from '../common/formfields/CasFileUpload'

export class CasUploadFlightInfo extends Component {
    render() {
        return (
          
              <div className="p-col-12">
                <div className="card card-w-title">
                  <div className="p-grid">
                    <div className="p-col-12">
                      <span>
                        <h1>Upload Multiple Flights Information</h1>{" "}
                        <CasFileUpload mode="basic" auto={false} accept="*" name="file" url={"http://localhost:8080/cas-gui/flight-info/upload"}/>
                      </span>
                    </div>
                  </div>
                  </div>
                  </div>
        )
    }
}

export default CasUploadFlightInfo
