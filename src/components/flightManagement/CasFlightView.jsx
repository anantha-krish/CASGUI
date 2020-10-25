import React, { Component } from "react";
import { ObjectUtil } from "../../lib/libs";
import { FlightInfoService } from "../../service/services";
import CasDataTable from "../common/datatable/CasDataTable";
import CasInputText from "../common/formfields/CasInputText";
import Button from "../common/formfields/CasButton";
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';

class CasFlightView extends Component {
  constructor() {
    super();

    this.state = {
      flightList: [],
      selectedFlight: {},
      flightFilter: "",
      deleteFlightDialog:false

    };
    this.setFlightDetailsCallBack = this.setFlightDetailsCallBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.arrDateBodyTemplate = this.arrDateBodyTemplate.bind(this);
    this.deptDateBodyTemplate = this.deptDateBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.confirmDeleteFlight = this.confirmDeleteFlight.bind(this);
    this.hideDeleteFlightDialog = this.hideDeleteFlightDialog.bind(this);
    this.deleteFlightCallBack = this.deleteFlightCallBack.bind(this);
    this.deleteFlight = this.deleteFlight.bind(this);
    
  }

  setFlightDetailsCallBack(flightInfo) {
    this.setState({
      flightList: flightInfo,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

 
  componentDidMount() {
    FlightInfoService.getAllFlightInfo(this.setFlightDetailsCallBack);
  }

  deptDateBodyTemplate(rowData) {
    return this.dateTemplate(rowData.depDate);
  }
  arrDateBodyTemplate(rowData) {
    return this.dateTemplate(rowData.arvDate);
  }

  dateTemplate(unFormatedDate){
    let date = new Date(unFormatedDate);
    let dateString =  date.getFullYear()+"-"+("0"+(date.getDay()+1)).slice(-2)+"-"+("0"+date.getDate()).slice(-2);
    return (
      <React.Fragment>
          <span className="p-column-title">{dateString}</span>
      </React.Fragment>
    );
  }

  actionBodyTemplate(rowData) {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editProduct(rowData)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteFlight(rowData)} />
        </React.Fragment>
    );
  }

  confirmDeleteFlight(selectedFlight) {
    this.setState({
        selectedFlight,
        deleteFlightDialog: true
    });
  }
  hideDeleteFlightDialog() {
    this.setState({ deleteFlightDialog: false });
  }

  deleteFlight() {
    FlightInfoService.deleteFlightInfo(this.state.selectedFlight.id,this.deleteFlightCallBack);
    this.hideDeleteFlightDialog();
  }

  deleteFlightCallBack(status) {
    if(status ===204){
      FlightInfoService.getAllFlightInfo(this.setFlightDetailsCallBack);
      this.messages.show({severity: 'success', summary: 'Flight Deleted Successfully.'});
      
    }
  }
  
  render() {
    const deleteFlightDialogFooter = (
      <React.Fragment>
          <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteFlightDialog} />
          <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteFlight} />
      </React.Fragment>
    );


    let renderColumns = [
      { field: "flightNumber", header: "Flight Number" ,sortable:true ,headerClassName:"flight-number-column-header"},
      { field: "depAirport", header: "Dep Airport", sortable:true,headerClassName:"airport-column-header" },
      { field: "arvAirport", header: "Arr Airport",sortable:true,headerClassName:"airport-column-header" },
      { field: "depDate", header: "Dep Date" ,sortable:true,body:this.deptDateBodyTemplate},
      { field: "depTime", header: "Dep Time",sortable:true },
      { field: "arvDate", header: "Arr Date",sortable:true,body:this.arrDateBodyTemplate },
      { field: "arvTime", header: "Arr Time",sortable:true },
      { field: "resource", header: "Resource",sortable:true },
      { field: "uploadLocation", header: "File",sortable:true },
      { header: "Action",body:this.actionBodyTemplate,headerClassName:"action-column-header" }
      
    ];
    return (
      <div className="p-grid flights-view-container">
        <div className="p-col-12">
          <div className="card card-w-title">
            <div className="p-grid">
              <div className="p-col-10">
                <span className="flights-list-header" ><h1>List of Flights</h1> </span>
              </div>
              <div className="p-col">
                <span className="p-input-icon-right float-right">
                  <i className="pi pi-search" />
                  <CasInputText
                    onChange={this.handleChange}
                    name="flightFilter"
                    placeholder="Search"
                    value={this.state.flightFilter}/>
                </span>
              </div>
            </div>
            <CasDataTable
              data={this.state.flightList}
              selection={this.state.selectedFlight}
              rows={8}
              globalFilter={this.state.flightFilter}
              columns={renderColumns}/>
            <Messages ref={(el) => this.messages = el} className="flight-view-message"></Messages>
          </div>
         
        </div>
        <Dialog className="cas-dialog" visible={this.state.deleteFlightDialog} style={{ width: '30rem' }} header="Confirm" modal footer={deleteFlightDialogFooter} onHide={this.hideDeleteFlightDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
            {<span>Are you sure you want to delete flight <b>{this.state.selectedFlight.flightNumber}</b>?</span>}
          </div>         
        </Dialog>
      </div>
      
    );
  }
}

export default CasFlightView;
