import React, { Component } from "react";
import { LabelConstants,ErrorConstants } from "../../constants/constants";
import CasAirportInput from "../common/formfields/CasAirportInput";
import CasButton from "../common/formfields/CasButton";
import CasInputText from "../common/formfields/CasInputText";
import { Formik } from "formik";
import { AirportService,CancellationService } from "../../service/services";
import CasCalendar from "../common/formfields/CasCalendar";
import CasSelect from "../common/formfields/CasSelect";
import CasTimePicker from "../common/formfields/CasTimePicker";
import CasDataTable from "../common/datatable/CasDataTable"
import CasMessage from "../common/messages/CasMessage";
import classNames from 'classnames';
import Button from "../common/formfields/CasButton";

class CasReasonApproval extends Component {
  constructor(props) {
    super(props);
    this.searchRecords = this.searchRecords.bind(this);
    this.setAirportsCallBack = this.setAirportsCallBack.bind(this);
    this.handleChangeRes = this.handleChangeRes.bind(this);
    this.deptDateBodyTemplate = this.deptDateBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.reasonBodyTemplate = this.reasonBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.approveRequest = this.approveRequest.bind(this);
    this.handleRowReasonChange = this.handleRowReasonChange.bind(this);
    this.handleChangeReasonCommon = this.handleChangeReasonCommon.bind(this);
    this.updateReason = this.updateReason.bind(this);
    this.isEnabledUpdateReason = this.isEnabledUpdateReason.bind(this);
    
    
    
    this.state = {
      airportData: [],
      searchResults:[],
      selectedData:null,
      globalFilter:"",
      reasonCommon:null
    };
    this.cancelReasonOptions = [
      {id:"1",code: "Bad Weather"},
      {id:"2",code: "Mechanical Issues"},
      {id:"3",code: "Security Issues"},
      {id:"4",code: "Bird Strikes"},
      {id:"5",code: "Missing Crew"},
      {id:"6",code: "Computer Glitch"}
    ];
  }

  handleChangeReasonCommon(event){
    this.setState({
      reasonCommon: event.target.value,
    });
  }

  handleChangeRes(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  validateCancelForm(values) {
    const errors = {};
    console.log(values);
    if (!values.flightType) errors.flightType = ErrorConstants.CAS_GUI_ERR_02;
    return errors;
  }

  setAirportsCallBack(airportData) {
    this.setState({
      airportData,
    });
  }

  isEnabledUpdateReason(){
    if(this.state.reasonCommon && this.state.selectedData && this.state.selectedData.length){
      return true;
    }
    if(this.state.searchResults.filter(obj=>obj.edited).length >0){
      return true;
    }
    return false;

  }


  componentDidMount() {
    AirportService.getAllAirports(this.setAirportsCallBack);
  }

  searchRecords(values) {
    this.values =values;
    let searchObj={};
    searchObj.flightType=values.flightType.code;
    if(values.arvAirport)
      searchObj.arvAirport=values.arvAirport;
    if(values.depAirport)
      searchObj.depAirport=values.depAirport;
    if(values.depDateStart)
      searchObj.depDateStart=values.depDateStart;
    if(values.depDateEnd)
      searchObj.depDateEnd=values.depDateEnd;
    if(values.carrierCode)
      searchObj.carrierCode = values.carrierCode.code;
    if(values.flightNumber)
      searchObj.flightNumber = values.flightNumber;
    if(values.depTimeStart)
      searchObj.depTimeStart = values.depTimeStart;
    if(values.arvTimeStart)
      searchObj.arvTimeStart = values.arvTimeStart;
    if(values.depTimeEnd)
      searchObj.depTimeEnd = values.depTimeEnd;
    if(values.arvTimeEnd)
      searchObj.arvTimeEnd = values.arvTimeEnd;
    if(values.reason)
      searchObj.reason = values.reason;
    
   CancellationService.searchCancellationInfo(searchObj).then
    ((data)=>{
     this.setState({
        searchResults:data,
        selectedData:null

      })
    });
  }
  deptDateBodyTemplate(rowData) {
    return this.dateTemplate(rowData.depDate);
  }
  

  dateTemplate(unFormatedDate){
    let date = new Date(unFormatedDate);
    let dateString =  date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+date.getDate()).slice(-2);
    return (
      <React.Fragment>
          <span className="p-column-title">{dateString}</span>
      </React.Fragment>
    );
  }

  handleRowReasonChange(rowData,value){
    let searchResults = this.state.searchResults;
    let objIndex = searchResults.findIndex((obj => obj.id == rowData.id));
    searchResults[objIndex].reason = value.code;
    searchResults[objIndex].edited = true;
    this.setState({
      searchResults

    })
    
  }

  reasonBodyTemplate(rowData) {
    rowData.reasonItem={};
    if(rowData.reason){
      rowData.reasonItem =this.cancelReasonOptions.filter(option => option.code ===rowData.reason)[0];
    }
    return (
        <React.Fragment>
            <CasSelect
              id={`cancelReason${rowData.id}`}
              name={`reason${rowData.id}`}
              options={this.cancelReasonOptions}
              optionLabel="code"
              filter={true}
              filterBy="code"
              value={rowData.reasonItem}
              onChange={(e) => this.handleRowReasonChange(rowData, e.target.value)}/>
        </React.Fragment>
    );
 }

 statusBodyTemplate(rowData){
  return (
    <React.Fragment>
        <span className={classNames({'status-badge':true,'pending-badge': rowData.status==="PENDING",'approved-badge': rowData.status==="APPROVED",'rejected-badge': rowData.status==="REJECTED"})}>{rowData.status}</span>
    </React.Fragment>
  );
 }
 actionBodyTemplate(rowData) {
   if(rowData.status ==="PENDING"){
    return (
      <React.Fragment>
        <div className="p-grid action-column">
            <Button icon="pi pi-check-circle" tooltip ="Approve" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.approveRequest(rowData)} />
            <Button icon="pi pi-times-circle" tooltip ="Reject" className="p-button-rounded p-button-danger" onClick={() => this.rejectRequest(rowData)} />
          </div>
      </React.Fragment>
    );
  } else {
    return(<> </>);
  }
  
}

updateReason() {
  let updateReasonInfos =[];
  if(this.state.reasonCommon && this.state.selectedData && this.state.selectedData.length){
    this.state.selectedData.map(obj =>{
      obj.reason = this.state.reasonCommon.code;
      updateReasonInfos.push(obj);

    })
    
  } else{
    updateReasonInfos = this.state.searchResults.filter(obj=>obj.edited);

  }
  if(updateReasonInfos.length){
    CancellationService.updateCancellationReasons(updateReasonInfos).then
    (()=>{
      this.messages.show({severity: 'success', summary: 'Updated -> ', detail: ' Cancellation Reason Updated for the Selected Records.' , life:5000} );
      if(this.values){
        this.searchRecords(this.values);
      }
    });
  }
  


}

approveRequest(rowData){
  
  let approveDataList =[];
  if(this.state.selectedData){
    approveDataList =this.state.selectedData.filter(data=>data.status ==="PENDING");
  } else {
    approveDataList.push(rowData);
  }
  CancellationService.approveCancellationInfos(approveDataList).then
    (()=>{
      this.messages.show({severity: 'success', summary: 'Approved -> ', detail: ' Selected Records Approved Successfully' , life:5000} );
      if(this.values){
        this.searchRecords(this.values);
      }
  });

}

rejectRequest(rowData){
  
  let approveDataList =[];
  if(this.state.selectedData){
    approveDataList =this.state.selectedData.filter(data=>data.status ==="PENDING");
  } else {
    approveDataList.push(rowData);
  }
  CancellationService.rejectCancellationInfos(approveDataList).then
    (()=>{
      this.messages.show({severity: 'success', summary: 'Rejected -> ', detail: ' Selected Records Rejected Successfully' , life:5000} );
      if(this.values){
        this.searchRecords(this.values);
      }
  });

}

  render() {
    let label = LabelConstants.cancelFormPage;

    let carrierCodeOptions = [
      {id:"1",code: "NH"},
      {id:"2",code: "AI"},
      {id:"3",code: "JL"},
      {id:"4",code: "CA"}
    ];

    

    let flightTypeOptions = [
      {id:"1",code: "Domestic"},
      {id:"2",code: "International"},
    ];

    const setInitialValues = {
      flightType:flightTypeOptions[0]
    };

    let renderColumns = [
     
      { field: "flightType", header: label.table.flightType ,headerClassName:"flight-type-header"},
      { field: "depDate", header: label.table.boardingStartDate ,sortable:true,body:this.deptDateBodyTemplate,headerClassName:"date-header" },
      { field: "depAirport", header: label.table.depAirport ,sortable:true,headerClassName:"airport-header" },
      { field: "arvAirport", header: label.table.arrAirport ,sortable:true,headerClassName:"airport-header" },
      { field: "flightNumber", header: label.table.flightNum ,sortable:true,headerClassName:"flight-number-header" },
      { field: "depTime", header: label.table.depTime ,sortable:true,headerClassName:"time-header" },
      { field: "arvTime", header: label.table.ArvTime ,sortable:true,headerClassName:"time-header" },
      { field: "reason", header: label.table.reason ,sortable:true,body:this.reasonBodyTemplate },
      { field: "status", header: label.table.status ,sortable:true ,body:this.statusBodyTemplate,headerClassName:"status-header"},
      { header: "Action",body:this.actionBodyTemplate,headerClassName:"action-header" }

  ];

    

    return (
      <>
        <div className="p-grid form-container">
            <CasMessage passRef={(el) => this.messages = el} className="forms-message"></CasMessage>
            <div className="p-col-12">
              <div className="card card-w-title">
                <div className="p-grid">
                  <div className="p-col-12">
                    <span ><h1>{label.title}</h1> </span>
                  </div>
                </div>
                <Formik
                  initialValues={setInitialValues}
                  validate={this.validateCancelForm}
                  onSubmit={this.searchRecords}>
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}>
           
                      <div className="p-grid input-fields-container">
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelCarrierCD">{label.type}</label>
                        </div>
                        <div className="p-col-6  p-lg-2 p-md-2">
                          <CasSelect
                            id="cancelFlightType"
                            name="flightType"
                            options={flightTypeOptions}
                            optionLabel="code"
                            value={values.flightType}
                            errorText={errors.flightType}
                            onChange={handleChange}/>
                        </div>


                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelDepDateStart">
                            {label.boardingStartDate}
                          </label>
                        </div>
                        <div className="p-col-6  p-lg-2 p-md-2">
                          <CasCalendar
                            id="cancelDepDateStart"
                            onChange={handleChange}
                            name="depDateStart"
                            showIcon={true}
                            value={values.depDateStart}
                            numberOfMonths={3}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelDepDateEnd">{label.boardingEndDate}</label>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2">
                          <CasCalendar
                            id="cancelDepDateEnd"
                            onChange={handleChange}
                            name="depDateEnd"
                            showIcon={true}
                            value={values.depDateEnd}
                            numberOfMonths={3}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelDepAirport">{label.depAirport}</label>
                        </div>
                        <div className="p-col-6  p-lg-2 p-md-2">
                          <CasAirportInput
                            airportType="departure"
                            onChange={handleChange}
                            id="cancelDepAirport"
                            name="depAirport"
                            airportData={this.state.airportData}
                            value={values.depAirport}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelArrAirport">{label.arrAirport}</label>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2">
                          <CasAirportInput
                            airportType="arrival"
                            onChange={handleChange}
                            id="cancelArrAirport"
                            name="arvAirport"
                            airportData={this.state.airportData}
                            value={values.arvAirport}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelCarrierCD">{label.carrierCode}</label>
                        </div>
                        <div className="p-col-6  p-lg-2 p-md-2">
                          <CasSelect
                            id="cancelCarrierCD"
                            name="carrierCode"
                            optionLabel="code"
                            filter={true}
                            filterBy="code"
                            options={carrierCodeOptions}
                            value={values.carrierCode}
                            onChange={handleChange}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelflightNumber">{label.flightNum}</label>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2">
                          <CasInputText
                            value={values.flightNumber}
                            id="cancelflightNumber"
                            name="flightNumber"
                            onChange={handleChange}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelDepTimeStart">{label.depTimeStart}</label>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2">
                          <CasTimePicker
                            id="cancelDepTimeStart"
                            onChange={handleChange}
                            name="depTimeStart"
                            value={values.depTimeStart}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelDepTimeEnd">{label.depTimeEnd}</label>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2">
                        <CasTimePicker
                            id="cancelDepTimeEnd"
                            onChange={handleChange}
                            name="depTimeEnd"
                            value={values.depTimeEnd}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelArvTimeStart">{label.ArvTimeStart}</label>
                        </div>
                        <div className="p-col-6  p-lg-2 p-md-2">
                        <CasTimePicker
                            id="cancelArvTimeStart"
                            onChange={handleChange}
                            name="arvTimeStart"
                            value={values.arvTimeStart}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelArvTimeEnd">{label.ArvTimeEnd}</label>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2">
                        <CasTimePicker
                            id="cancelArvTimeEnd"
                            onChange={handleChange}
                            name="arvTimeEnd"
                            value={values.arvTimeEnd}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="input">{label.reason}</label>
                        </div>
                        <div className="p-col-6  p-lg-2 p-md-2">
                          <CasSelect
                            id="cancelReason"
                            name="reason"
                            options={this.cancelReasonOptions}
                            optionLabel="code"
                            filter={true}
                            filterBy="code"
                            value={values.reason}
                            onChange={handleChange}/>
                        </div>
                      </div>
                      <div className="p-grid form-field-button">  
                          <div className="p-col-12 ">
                            <div className="float-right">
                              <CasButton label={label.search} onClick={handleSubmit}  />
                            </div>
                          </div>
                      </div>
                     
                          
                     
                   
                    </form>
              )}
              </Formik>
              <div className="p-col-12 cancelation-results-container">
                <div className="card-w-title">
                  <div className="p-grid">
                    
                    <div className="p-col-5 float-left">
                      <span className="flights-list-header" ><h1>{label.resultsHeader}</h1> </span>
                    </div>
                    <div className="p-col-2 float-left">
                      <span className="p-input-icon-right float-right">
                        <i className="pi pi-search" />
                        <CasInputText
                          onChange={this.handleChangeRes}
                          name="globalFilter"
                          placeholder="Global Search"
                          value={this.state.globalFilter}/>
                      </span>
                    </div>
                    
                    <div className="p-col-5 float-right">
                      <div style={{width:'35%',float:"right"}}><CasButton className="float-right" disabled={!this.isEnabledUpdateReason()} label="Update Reason" onClick={() => this.updateReason()}  /> </div>
                      <div style={{width:'50%',float:"right",paddingLeft:"3rem"}}>
                        <CasSelect
                          id="cancelReasonCommon"
                          name="reasonCommon"
                          options={this.cancelReasonOptions}
                          optionLabel="code"
                          filter={true}
                          placeholder="Select Reason"
                          filterBy="code"
                          value={this.state.reasonCommon}
                          onChange={this.handleChangeReasonCommon}/>
                      </div>

                    </div>
                   

                  </div>
                  <CasDataTable
                    data={this.state.searchResults}
                    selection={this.state.selectedData}
                    rows={5}
                    editMode="cell"
                    rowHover={true}
                    showSelection={true}
                    selectionMode="multiple"
                    globalFilter={this.state.globalFilter}
                    onSelectionChange={e => this.setState({selectedData: e.value})}
                    columns={renderColumns}/>
                </div>

              </div>
            </div>
          </div>
          
        </div>
       
      </>
    );
  }
}

export default CasReasonApproval;
