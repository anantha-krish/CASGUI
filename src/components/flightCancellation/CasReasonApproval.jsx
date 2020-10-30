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
import classNames from 'classnames';
import CasMessage from "../common/messages/CasMessage";

class CasReasonApproval extends Component {
  constructor(props) {
    super(props);
    this.submitCancelForm = this.submitCancelForm.bind(this);
    this.setAirportsCallBack = this.setAirportsCallBack.bind(this);
    this.handleChangeRes = this.handleChangeRes.bind(this);
    this.deptDateBodyTemplate = this.deptDateBodyTemplate.bind(this);
    this.arrDateBodyTemplate = this.arrDateBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    
  
    
    this.state = {
      airportData: [],
      searchResults:[],
      selectedData:null,
      globalFilter:""
    };
  }
  handleChangeRes(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  validateCancelForm(values) {
    const errors = {};
    console.log(values);
    if (!values.cancelType) errors.cancelType = ErrorConstants.CAS_GUI_ERR_02;
    return errors;
  }

  setAirportsCallBack(airportData) {
    this.setState({
      airportData,
    });
  }


  componentDidMount() {
    AirportService.getAllAirports(this.setAirportsCallBack);
  }

  submitCancelForm(values, { setSubmitting }) {
    let searchObj={};
    searchObj.cancelType=values.cancelType.code;
    if(values.arvAirport)
      searchObj.arvAirport=values.arvAirport;
    if(values.depAirport)
      searchObj.depAirport=values.depAirport;
    if(values.arvDate)
      searchObj.arvDate=values.arvDate;
    if(values.depDate)
      searchObj.depDate=values.depDate;
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
    
    setSubmitting(false);
    
    CancellationService.searchCancellationInfo(searchObj).then
    ((data)=>{
      debugger;
      setSubmitting(false);
      this.setState({
        searchResults:data
      })
    });
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

  statusBodyTemplate(rowData) {
    return (
        <React.Fragment>
            
            <span className={classNames({'pending-badge': rowData.status==="PENDING",'approved-badge': rowData.status==="APPROVED"})}>{rowData.status}</span>
        </React.Fragment>
    );
 }

  render() {
    let label = LabelConstants.cancelFormPage;

   

    let carrierCodeOptions = [
      {id:"1",code: "NH"},
      {id:"2",code: "AI"},
      {id:"3",code: "JL"},
      {id:"4",code: "CA"}
    ];

    let cancelReasonOptions = [
      {id:"1",code: "Bad Weather"},
      {id:"2",code: "Mechanical Issues"},
      {id:"3",code: "Security Issues"},
      {id:"4",code: "Bird Strikes"},
      {id:"5",code: "Missing Crew"},
      {id:"6",code: "Computer Glitch"}
    ];

    let cancelTypeOptions = [
      {id:"1",code: "Domestic"},
      {id:"2",code: "International"},
    ];

    const setInitialValues = {
      cancelType:cancelTypeOptions[0]
    };

    let renderColumns = [
      { field: "depDate", header: label.table.boardingStartDate ,sortable:true,body:this.deptDateBodyTemplate },
      { field: "arvDate", header: label.table.boardingEndDate ,sortable:true, body:this.arrDateBodyTemplate},
      { field: "depAirport", header: label.table.depAirport ,sortable:true },
      { field: "arvAirport", header: label.table.arrAirport ,sortable:true },
      { field: "carrierCode", header: label.table.carrierCode ,sortable:true },
      { field: "flightNumber", header: label.table.flightNum ,sortable:true },
      { field: "depTimeStart", header: label.table.depTimeStart ,sortable:true },
      { field: "depTimeEnd", header: label.table.depTimeEnd ,sortable:true },
      { field: "arvTimeStart", header: label.table.ArvTimeStart ,sortable:true },
      { field: "arvTimeEnd", header: label.table.ArvTimeEnd ,sortable:true },
      { field: "reason", header: label.table.reason ,sortable:true },
      { field: "status", header: label.table.status ,sortable:true ,body:this.statusBodyTemplate}

  ];

    

    return (
      <>
        <div className="p-grid form-container">
            <CasMessage ref={(el) => this.messages = el} className="forms-message"></CasMessage>
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
                  onSubmit={this.submitCancelForm}>
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
                            name="cancelType"
                            options={cancelTypeOptions}
                            optionLabel="code"
                            value={values.cancelType}
                            errorText={errors.cancelType}
                            onChange={handleChange}/>
                        </div>


                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelDepDate">
                            {label.boardingStartDate}
                          </label>
                        </div>
                        <div className="p-col-6  p-lg-2 p-md-2">
                          <CasCalendar
                            id="cancelDepDate"
                            onChange={handleChange}
                            name="depDate"
                            showIcon={true}
                            value={values.depDate}
                            numberOfMonths={3}/>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                          <label htmlFor="cancelArvDate">{label.boardingEndDate}</label>
                        </div>
                        <div className="p-col-6 p-lg-2 p-md-2">
                          <CasCalendar
                            id="cancelArvDate"
                            onChange={handleChange}
                            name="arvDate"
                            showIcon={true}
                            value={values.arvDate}
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
                            options={cancelReasonOptions}
                            optionLabel="code"
                            filter={true}
                            filterBy="code"
                            value={values.reason}
                            onChange={handleChange}/>
                        </div>
                      </div>
                      <div className="p-col-12">
                          <div className="p-grid form-field-button">  
                            <div className="p-col-12 ">
                              <div className="float-right">
                                <CasButton label={label.search} onClick={handleSubmit} disabled={isSubmitting} />
                              </div>
                            </div>
                          </div>
                      </div>
                   
                    </form>
              )}
              </Formik>
              <div className="p-col-12">
                <div className="card-w-title">
                  <div className="p-grid">
                    <div className="p-col-10">
                      <span className="flights-list-header" ><h1>{label.resultsHeader}</h1> </span>
                    </div>
                    <div className="p-col">
                      <span className="p-input-icon-right float-right">
                        <i className="pi pi-search" />
                        <CasInputText
                          onChange={this.handleChangeRes}
                          name="globalFilter"
                          placeholder="Search"
                          value={this.state.globalFilter}/>
                      </span>
                    </div>
                  </div>
                  <CasDataTable
                    data={this.state.searchResults}
                    selection={this.state.selectedData}
                    rows={8}
                    globalFilter={this.state.globalFilter}
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
