import { Formik } from "formik";
import React, { Component } from "react";
import { ErrorConstants, LabelConstants } from "../../constants/constants";
import { AirportService, FlightInfoService } from "../../service/services";
import CasAirportInput from "../common/formfields/CasAirportInput";
import CasButton from "../common/formfields/CasButton";
import CasCalendar from "../common/formfields/CasCalendar";
import CasInputText from "../common/formfields/CasInputText";
import CasTimePicker from "../common/formfields/CasTimePicker";
import { FileUpload } from 'primereact/fileupload';
import PropTypes from 'prop-types';

class CasFlightCreate extends Component {
  constructor(props) {
    super(props);
    this.submitFlightForm = this.submitFlightForm.bind(this);
    this.setAirportsCallBack = this.setAirportsCallBack.bind(this);
    this.state = {
      airportData: [],
      mode:"create"
    };
    
  }
  static propTypes = {
    callBackToGetFlightInfo:PropTypes.func
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

  componentDidUpdate(){
    if(this.props.callBackToGetFlightInfo){
      let flightInfo = this.props.callBackToGetFlightInfo();
      console.log("flight Info---",flightInfo);
    }
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
      uploadLocation: "location"
    };
    const headerLabel =this.state.mode ==="create"?"Create New Flight":"Update The Flight";


    return (
      
      <>
        
        <Formik
          initialValues={setInitialValues}
          validate={this.validateFlightForm}
          onSubmit={this.submitFlightForm}
          validateOnBlur={false}>
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

          <div className="p-grid flights-create-container">
            <div className="p-col-12">
              <div className="card card-w-title">
                <div className="p-grid">
                  <div className="p-col-12">
                    <span ><h1>{headerLabel}</h1> </span>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  {/* Row 1 */}

                  {/* Row 2 */}
                  <div className="p-grid input-fields-container">
                  
                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightDepAirport">{label.depAirport}</label>
                    </div>
                    <div className="p-col-6  p-lg-2 p-md-2">
                      <CasAirportInput
                        airportType="departure"
                        onChange={handleChange}
                        id="flightDepAirport"
                        name="depAirport"
                        airportData={this.state.airportData}
                        value={values.depAirport}
                        errorText={errors.depAirport}/>
                    </div>
                   
                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightDepDate">{label.depDate}</label>
                    </div>
                    <div className="p-col-6  p-lg-2 p-md-2">
                      <CasCalendar
                        id="flightDepDate"
                        onChange={handleChange}
                        name="depDate"
                        showIcon={true}
                        numberOfMonths={3}
                        errorText={errors.depDate}/>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightDepTime">{label.depTime}</label>
                    </div>
                    <div className="p-col-6  p-lg-2 p-md-2">
                      <CasTimePicker
                        id="flightDepTime"
                        onChange={handleChange}
                        name="depTime"
                        value={values.depTime}
                        errorText={errors.arvTime}/>
                    </div>

                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightArrAirport">{label.arvAirport}</label>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2">
                      <CasAirportInput
                        airportType="arrival"
                        onChange={handleChange}
                        id="flightArrAirport"
                        name="arvAirport"
                        airportData={this.state.airportData}
                        value={values.arvAirport}
                        errorText={errors.arvAirport}/>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightArvDate">{label.arvDate}</label>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-4">
                      <CasCalendar
                        id="flightArvDate"
                        onChange={handleChange}
                        name="arvDate"
                        showIcon={true}
                        numberOfMonths={3}
                        errorText={errors.arvDate}/>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightArvTime">{label.arvTime}</label>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2">
                      <CasTimePicker
                        id="flightArvTime"
                        onChange={handleChange}
                        name="arvTime"
                        value={values.arvTime}
                        errorText={errors.arvTime}/>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightNumber">{label.flightNum}</label>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2">
                      <CasInputText
                        value={values.flightNumber}
                        id="flightNumber"
                        name="flightNumber"
                        onChange={handleChange}
                        errorText={errors.flightNumber}/>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightResource">{label.resource}</label>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2">
                      <CasInputText
                        value={values.resource}
                        id="flightResource"
                        name="resource"
                        onChange={handleChange}
                        errorText={errors.resource}/>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightUploadLocation">{label.upload}</label>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2">
                      <FileUpload name="flightFile" url="../../assets/uploads" mode="basic" />
                    </div>
                  </div>
                  <div className="p-grid form-field-button">  
                    <div className="p-col-12 ">
                      <div className="float-right">
                        <CasButton label="Save" disabled={isSubmitting} />
                      </div>
                    </div>
                  </div>
                 
                </form>
              </div>
            </div>
          </div>
          )}
        </Formik>
        
      </>
    );
  }
}

export default CasFlightCreate;
