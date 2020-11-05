import React, { Component } from "react";
import {FileUpload} from 'primereact/fileupload';

class CasFileUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      invalidFileError:"" 
    }
    this.onUpload = this.onUpload.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.validateFiles = this.validateFiles.bind(this);
    this.fileTypes=[];
    if(this.props.accept){
      this.fileTypes = this.props.accept.split(",");
      this.fileTypes = this.fileTypes.map(s => s.trim());
    }
    
  }

  validateFiles(files){
    let validate = true;
    let invalidFileError="";
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if(!this.fileTypes.includes(file.type)){
        validate =false;
        break;
      }
    }
    if(!validate){
      invalidFileError ="Invalid File(S) Selected.";
      this.fileInput.clear();
    }
    this.setState({
      invalidFileError
    });
    return validate;
  }

  onUpload (e){
    if(this.props.onUpload){
      this.props.onUpload(e);
    }
  }

  uploadHandler (files){
    if(this.props.uploadHandler){
      this.props.uploadHandler(files);
    }
  }

  onSelect (filesEvent){
    if(this.validateFiles(filesEvent.files) && this.props.onSelect){
      this.props.onSelect(filesEvent);
    }
  }

  
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

  render() {
    const {
      mode,
      name,
      url,
      auto,
      maxFileSize,
      accept,
      errorText,
      customUpload,
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
              onUpload={this.onUpload}
              customUpload={customUpload}
              uploadHandler={this.uploadHandler}
              multiple ={multiple}
              onError={onError} 
              onSelect={this.onSelect} 
              ref={(el) => this.fileInput = el}    
            />
         
          <div  className="form-field-label">
           {errorText && <small className="cas-inline-err-text p-d-block">{errorText}</small>}
           {this.state.invalidFileError && <small className="cas-inline-err-text p-d-block">{this.state.invalidFileError}</small>}
          </div>
          </>
        
    );
  }
}

export default CasFileUpload;
