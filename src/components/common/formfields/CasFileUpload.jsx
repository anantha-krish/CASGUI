import React, { Component } from "react";
import {FileUpload} from 'primereact/fileupload'

class CasFileUpload extends Component {
  
    static defaultProps = {
   
    name: "file",
    url: "http://localhost:8080/cas-gui/upload",
    accept: "*",
    auto:true,
    maxFileSize: 5000000,
    onUpload: () => {},
    files: [],
    errorText: "",
    multiple :false,
    customUpload:false,
    uploadHandler:() => {},
    onError:()=>{},
  };

  renderFileNames(files){
    if(files && files.length){
      return (files.map((file) => {
        return(<span style={{ marginLeft: "1rem" }}>{file.name}</span>)
      }))
    }
    return(<> </>);
  }

  render() {
    const {
      mode,
      name,
      url,
      auto,
      maxFileSize,
      onUpload,
      accept,
      files,
      errorText,
      customUpload,
      uploadHandler,
      multiple ,
      onError
    } = this.props;

    return (<>
            <FileUpload
              mode={mode}
              name={name}
              auto={auto}
              url={url}
              accept={accept}
              maxFileSize={maxFileSize}
              onUpload={onUpload}
              customUpload={customUpload}
              uploadHandler={uploadHandler}
              multiple ={true}
              onError={onError}      
            />
         
          <div  className="form-field-label">
           {errorText && <small className="cas-inline-err-text p-d-block">{errorText}</small>}
          </div>
          </>
        
    );
  }
}

export default CasFileUpload;
