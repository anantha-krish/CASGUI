import React, { Component } from "react";
import { ObjectUtil } from "../../lib/libs";
import { FlightInfoService, AirportService } from "../../service/services";
import CasDataTable from "../common/datatable/CasDataTable";
import CasInputText from "../common/formfields/CasInputText";
import Button from "../common/formfields/CasButton";
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';
import CasMessage from "../common/messages/CasMessage";
import CasButton from "../common/formfields/CasButton";
import CasAirportInput from "../common/formfields/CasAirportInput";
import CasCalendar from "../common/formfields/CasCalendar";
import CasTimePicker from "../common/formfields/CasTimePicker";

class CasFlightView extends Component {
  constructor() {
    super();
    

    this.state = {
      flightList: [],
      selectedFlight: {},
      flightFilter: "",
      deleteFlightDialog:false,
      airportData:[]

    };
    this.setFlightDetailsCallBack = this.setFlightDetailsCallBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.arrDateBodyTemplate = this.arrDateBodyTemplate.bind(this);
    this.deptDateBodyTemplate = this.deptDateBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.confirmDeleteFlight = this.confirmDeleteFlight.bind(this);
    this.hideDeleteFlightDialog = this.hideDeleteFlightDialog.bind(this);
    this.deleteFlight = this.deleteFlight.bind(this);
    this.editFlight = this.editFlight.bind(this);
    this.fileTemplate = this.fileTemplate.bind(this);
    this.addNewFlight = this.addNewFlight.bind(this);
    this.setAirportsCallBack = this.setAirportsCallBack.bind(this);
    this.isUpdationDisabled = this.isUpdationDisabled.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.rowStyleProvider = this.rowStyleProvider.bind(this);
    this.referenceFun = this.referenceFun.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    
    
    
    
  }
  static propTypes = {
    callBackToSetFlightInfo:PropTypes.func
  }

  setFlightDetailsCallBack(flightInfo) {
    if(flightInfo && flightInfo.length){
      flightInfo.forEach((flight) =>{
        flight.depDate = new Date(flight.depDate);
        flight.arvDate = new Date(flight.arvDate);
      })
      this.setState({
        flightList: flightInfo,
      });
    }
    
  }

  referenceFun(el){
    this.refObj = el;
  }

  exportCSV() {
    this.refObj.exportCSV();
  }

  rowStyleProvider(rowData){
   return {'modified-row':rowData.edited};
  }

  addNewFlight(){
    this.props.history.push("/flight-info/add");
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  setAirportsCallBack(airportData) {
    this.setState({
      airportData,
    });
  }

  isUpdationDisabled(){
    let disabled =true;
    if(this.state.flightList && this.state.flightList.length){
      for(var i=0; i<this.state.flightList.length ;i++){
        if(this.state.flightList[i].edited){
          disabled = false;
          break;
        }
      }
    }
    return disabled;
  }

 
  componentDidMount() {
    AirportService.getAllAirports(this.setAirportsCallBack);
    FlightInfoService.getAllFlightInfo(this.setFlightDetailsCallBack);
  }

  deptDateBodyTemplate(rowData) {
    return this.dateTemplate(rowData.depDate);
  }
  arrDateBodyTemplate(rowData) {
    return this.dateTemplate(rowData.arvDate);
  }

  dateTemplate(date){
   
    let dateString =  date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+date.getDate()).slice(-2);
    return (
      <React.Fragment>
          <span className="p-column-title">{dateString}</span>
      </React.Fragment>
    );
  }

  actionBodyTemplate(rowData) {
    return (
        <React.Fragment>
          <div className="p-grid">
         <div className="p-col-6">  <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editFlight(rowData)} /></div> 
         <div className="p-col-6"> <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteFlight(rowData)} /></div>
            </div>
        </React.Fragment>
    );
  }

  fileTemplate(rowData){ 
    let flightNumber = rowData.flightNumber;
    if(rowData.file){
      let fileNameArray = rowData.file.split(",");
      return (fileNameArray.map((file)=>{
        let fileId = flightNumber+"/"+file;
        return (<div className="fileName-holder"><a href = {`http://localhost:8080/cas-gui/files/${fileId}`}>{file}</a></div>)
      }))
    }
   
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
    
    FlightInfoService.deleteFlightInfo(this.state.selectedFlight.id).then((stat) => {
      FlightInfoService.getAllFlightInfo(this.setFlightDetailsCallBack);
      this.flightViewMessage.show({
        severity: "success",
        summary: "Deleted->",
        detail: `Flight Deleted Successfully`,
        life: 5000,
      });
    });
    this.hideDeleteFlightDialog();
  }

 

  editFlight(flightInfo){
    this.props.history.push("/flight-info/edit/"+flightInfo.id);
  }

  onEditorValueChange(props, value) {
    let updatedFlights = [...props.value];
    updatedFlights[props.rowIndex]["edited"]=true;
    updatedFlights[props.rowIndex][props.field] = value;
    this.setState({ flightList: updatedFlights });
  }

  inputTextEditor(props) {
    return <CasInputText  value={props.rowData[props.field]} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  updateChanges(){
    let updatedFlights = this.state.flightList.filter(flight => flight.edited === true);
    FlightInfoService.updateFlightInfos(updatedFlights).then(() => {
      FlightInfoService.getAllFlightInfo(this.setFlightDetailsCallBack);
      this.flightViewMessage.show({
        severity: "success",
        summary: "Updated->",
        detail: `Flight details updated Successfully`,
        life: 5000,
      });
    });
  }

 
  airportEditor(props) {
    let airportType ="departure";
    if(props.field === "arvAirport") airportType = "arrival";
    return  <CasAirportInput
      airportType={airportType}
      onChange={(e) => this.onEditorValueChange(props, e.target.value)}
      airportData={this.state.airportData}
      value={props.rowData[props.field]}
      />;
  }

  dateEditor(props) {
    return  <CasCalendar
    onChange={(e) => this.onEditorValueChange(props, e.target.value)}
    showIcon={true}
    numberOfMonths={3}
    value={props.rowData[props.field]}/>
  }

  timeEditor(props) {
    return   <CasTimePicker
    onChange={(e) => this.onEditorValueChange(props, e.target.value)}
    value={props.rowData[props.field]}/>
  }


  
  render() {
    const deleteFlightDialogFooter = (
      <React.Fragment>
          <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteFlightDialog} />
          <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteFlight} />
      </React.Fragment>
    );
    

    let renderColumns = [
      { field: "flightNumber", header: "Flight Num" ,sortable:true , editor:(props) => this.inputTextEditor(props), headerClassName:"flight-number-column-header"},
      { field: "depAirport", header: "Dep Airport", sortable:true,headerClassName:"airport-column-header",editor:(props) => this.airportEditor(props) },
      { field: "arvAirport", header: "Arr Airport",sortable:true,headerClassName:"airport-column-header",editor:(props) => this.airportEditor(props) },
      { field: "depDate", header: "Dep Date" ,sortable:true,body:this.deptDateBodyTemplate,headerClassName:"date-column-header",editor:(props) => this.dateEditor(props)},
      { field: "depTime", header: "Dep Time",sortable:true,headerClassName:"time-column-header",editor:(props) => this.timeEditor(props) },
      { field: "arvDate", header: "Arr Date",sortable:true,body:this.arrDateBodyTemplate,headerClassName:"date-column-header",editor:(props) => this.dateEditor(props) },
      { field: "arvTime", header: "Arr Time",sortable:true,headerClassName:"time-column-header",editor:(props) => this.timeEditor(props) },
      { field: "resource", header: "Res",sortable:true,headerClassName:"res-column-header",editor:(props) => this.inputTextEditor(props) },
      { field: "file", header: "File",sortable:true , body:this.fileTemplate}, 
      { header: "Action",body:this.actionBodyTemplate,headerClassName:"action-column-header" }
      
    ];
    return (
      <div className="p-grid flights-view-container">
        <div className="p-col-12">
          <CasMessage passRef={(el) => this.flightViewMessage = el} className="forms-message"></CasMessage>
          <div className="card card-w-title">
            <div className="p-grid">
              <div className="p-col-5">
                <span className="flights-list-header" ><h1>List of Flights</h1> </span>
              </div>
              <div className="p-col-7">
                
                <CasButton icon="pi pi-external-link " className="float-right header-contents" label="Export" onClick={this.exportCSV}/>
                <CasButton icon="pi pi-pencil " label="Update Flight(s)" className="p-button p-component float-right header-contents" onClick={() => this.updateChanges()} disabled ={this.isUpdationDisabled()} />
                <CasButton icon="pi pi-plus " label="Add New Flight" className="p-button p-component float-right header-contents " onClick={() => this.addNewFlight()} />
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
              editMode="cell" 
              className="editable-cells-table"
              data={this.state.flightList}
              selection={this.state.selectedFlight}
              rows={7}
              globalFilter={this.state.flightFilter}
              rowClassName={this.rowStyleProvider}
              referenceFun={this.referenceFun}
              columns={renderColumns}/>
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
