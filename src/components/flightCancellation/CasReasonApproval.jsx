import React, { Component } from "react";
import { LabelConstants,ErrorConstants } from "../../constants/constants";
import CasAirportInput from "../common/formfields/CasAirportInput";
import CasButton from "../common/formfields/CasButton";
import CasInputText from "../common/formfields/CasInputText";
import { Formik } from "formik";
import { AirportService } from "../../service/services";
import CasCalendar from "../common/formfields/CasCalendar";
import CasSelect from "../common/formfields/CasSelect";
import CasTimePicker from "../common/formfields/CasTimePicker";
import CasDataTable from "../common/datatable/CasDataTable"
import { Messages } from 'primereact/messages';

class CasReasonApproval extends Component {
  constructor(props) {
    super(props);
    this.submitCancelForm = this.submitCancelForm.bind(this);
    this.setAirportsCallBack = this.setAirportsCallBack.bind(this);
    this.handleChangeRes = this.handleChangeRes.bind(this);
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
    debugger
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
    debugger;
    
    setSubmitting(false);
  }

  render() {
    let label = LabelConstants.cancelFormPage;

    const setInitialValues = {
    };

    let carrierCodeOptions = [
      {
        option: "test1",
      },
      { option: "test2" },
    ];

    let cancelReasonOptions = [
      {
        option: "test1",
      },
      { option: "test2" },
    ];

    let cancelTypeOptions = [
      {
        option: "Domestic",
      },
      { option: "International" },
    ];
    let renderColumns = [
      { field: "flightNumber", header: "Flight Number" ,sortable:true ,headerClassName:"flight-number-column-header"}
    ];

    

    return (
      <>
        <div className="p-grid form-container">
            <Messages ref={(el) => this.messages = el} className="forms-message"></Messages>
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
