import React, { Component } from "react";
import CasFormDemo from "./CasFormDemo";
import CasFormResult from "./CasFormResult";

class CasDashboard extends Component {
  constructor()
  { super();
    this.state={
      resultList:[]
    }
/*     this.getResults =this.getResults.bind(this); */
    this.setResult=this.setResult.bind(this);
  }

  setResult(resultJson)
  {
    this.setState({
      resultList:resultJson
    })
  }

  searchRequests()
  {
    //api call
    
  }

 
  render() {
    return (
      <div className="p-fluid">
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card card-w-title">
        <CasFormDemo/>
        <CasFormResult/>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default CasDashboard;
