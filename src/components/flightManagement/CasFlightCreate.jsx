import { Formik } from "formik";
import React, { Component } from "react";
import { ErrorConstants, LabelConstants } from "../../constants/constants";
import { AirportService, FlightInfoService } from "../../service/services";
import CasAirportInput from "../common/formfields/CasAirportInput";
import CasButton from "../common/formfields/CasButton";
import CasCalendar from "../common/formfields/CasCalendar";
import CasInputText from "../common/formfields/CasInputText";
import CasTimePicker from "../common/formfields/CasTimePicker";

class CasFlightCreate extends Component {
  constructor(props) {
    super(props);
    this.submitFlightForm = this.submitFlightForm.bind(this);
    this.setAirportsCallBack = this.setAirportsCallBack.bind(this);
    this.state = {
      airportData: [],
    };
  }
  validateFlightForm(values) {
    const errors = {};
    
    if(!values.depDate)
    {
      errors.depDate = ErrorConstants.CAS_GUI_ERR_INV_DATE
    }
        
    if(!values.arvDate)
    {
      errors.arvDate = ErrorConstants.CAS_GUI_ERR_INV_DATE
    }

    if(!values.depTime)
    {
      errors.depTime = ErrorConstants.CAS_GUI_ERR_INV_TIME
    }

    if(!values.arvTime)
    {
      errors.arvTime = ErrorConstants.CAS_GUI_ERR_INV_TIME
    }

    if(!values.arvAirport)
    {
      errors.arvAirport = ErrorConstants.CAS_GUI_ERR_NO_AIRPORT
    }

    if(!values.depAirport)
    {
      errors.depAirport = ErrorConstants.CAS_GUI_ERR_NO_AIRPORT
    }

   if(!values.flightNumber)
   {
     errors.flightNumber = ErrorConstants.CAS_GUI_ERR_NO_FLIGHT
   }


   if(!values.resource)
   {
     errors.resource = ErrorConstants.CAS_GUI_ERR_NO_RESOURC
   }

   if(!values.uploadLocation)
   {
     errors.uploadLocation = ErrorConstants.CAS_GUI_ERR_INV_UPLOAD
   }


  console.log(errors)
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

  submitFlightForm(values, { setSubmitting }) {
    // set is submitting when API gives response back
    FlightInfoService.createNewFlightInfo(values).then
    (()=>setSubmitting(false)
    );
   
  }

  render() {
    let label = LabelConstants.flightFormPage;

    const setInitialValues = {
  flightNumber: "",
  depDate: "",
  depTime: "",
  depAirport: "",
  arvDate: "",
  arvTime: "",
  arvAirport: "",
  resource: "",
  uploadLocation: ""
    };


    return (
      <>
        <h1>{label.title}</h1>
        <br />
        <br />
        <Formik
          initialValues={setInitialValues}
          validate={this.validateFlightForm}
          onSubmit={this.submitFlightForm}
          validateOnBlur={false}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,

            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              {/* Row 1 */}

              {/* Row 2 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightDepDate">{label.depDate}</label>
                </div>
                <div className="p-col-12  p-lg-2 p-md-2">
                  <CasCalendar
                    id="flightDepDate"
                    onChange={handleChange}
                    name="depDate"
                    showIcon={true}
                    numberOfMonths={3}
                    errorText={errors.depDate}
                  />
                </div>
                <div className="p-col-12  p-lg-1 p-md-4">&nbsp;</div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightDepTime">{label.depTime}</label>
                </div>
                <div className="p-col-12  p-lg-2 p-md-4">
                  <CasTimePicker
                    id="flightDepTime"
                    onChange={handleChange}
                    name="depTime"
                    value={values.depTime}
                    errorText={errors.arvTime}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightDepAirport">{label.depAirport}</label>
                </div>
                <div className="p-col-12  p-lg-2 p-md-4">
                  <CasAirportInput
                    airportType="departure"
                    onChange={handleChange}
                    id="flightDepAirport"
                    name="depAirport"
                    airportData={this.state.airportData}
                    value={values.depAirport}
                    errorText={errors.depAirport}
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightArrAirport">{label.arvAirport}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasAirportInput
                    airportType="arrival"
                    onChange={handleChange}
                    id="flightArrAirport"
                    name="arvAirport"
                    airportData={this.state.airportData}
                    value={values.arvAirport}
                    errorText={errors.arvAirport}
                  />
                </div>
              </div>
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightArvDate">{label.arvDate}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasCalendar
                    id="flightArvDate"
                    onChange={handleChange}
                    name="arvDate"
                    showIcon={true}
                    numberOfMonths={3}
                    errorText={errors.arvDate}
                  />
                </div>
                <div className="p-col-12  p-lg-1 p-md-4">&nbsp;</div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightArvTime">{label.arvTime}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasTimePicker
                    id="flightArvTime"
                    onChange={handleChange}
                    name="arvTime"
                    value={values.arvTime}
                    errorText={errors.arvTime}
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightNumber">{label.flightNum}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasInputText
                    value={values.flightNumber}
                    id="flightNumber"
                    name="flightNumber"
                    onChange={handleChange}
                    errorText={errors.flightNumber}
                  />
                </div>
              </div>

              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightResource">{label.resource}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasInputText
                    value={values.resource}
                    id="flightResource"
                    name="resource"
                    onChange={handleChange}
                    errorText={errors.resource}
                  />
                </div>
              </div>
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightUploadLocation">{label.upload}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasInputText
                    value={values.uploadLocation}
                    id="flightUploadLocation"
                    name="uploadLocation"
                    onChange={handleChange}
                    errorText={errors.uploadLocation}
                  />
                </div>
              </div>
              <br />
              <div className="p-grid">
                <div className="p-col-12 p-lg-3 p-md-2">
                  <CasButton label="Search" disabled={isSubmitting} />
                </div>
              </div>
            </form>
          )}
        </Formik>
      </>
    );
  }
}

export default CasFlightCreate;
