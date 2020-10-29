import React, { Component } from "react";
import {FileUpload} from 'primereact/fileupload'

class CasFileUpload extends Component {
  
    static defaultProps = {
    mode: "basic",
    name: "file",
    url: "http://localhost:8080/cas-gui/upload",
    accept: "*",
    maxFileSize: 5000000,
    onUpload: () => {},
    fileName: "",
    errorText: "",
  };

  render() {
    const {
      mode,
      name,
      url,
      maxFileSize,
      onUpload,
      accept,
      fileName,
      errorText,
    } = this.props;

    return (
      <div className="p-lg-6 p-md-6">
        <div className="p-grid">
          <div className="p-col-2">
            <FileUpload
              mode={mode}
              name={name}
              auto={true}
              url={url}
              accept={accept}
              maxFileSize={maxFileSize}
              onUpload={onUpload}
            />
          </div>
          <div style={{ marginLeft: "-2.5rem" }} className="form-field-label">
            {fileName && <span>{fileName}</span>}
            {errorText&&!fileName && <small className="cas-inline-err-text p-d-block">{errorText}</small>}
          </div>
        </div>
      </div>
    );
  }
}

export default CasFileUpload;
