import React, { Component } from "react";
import { LabelConstants } from "../../constants/constants";
import CasAirportInput from "../common/formfields/CasAirportInput";
import CasButton from "../common/formfields/CasButton";
import CasInputText from "../common/formfields/CasInputText";
import CasRadioBtn from "../common/formfields/CasRadioBtn";
import { Formik } from "formik";
import { AirportService } from "../../service/services";
import CasCalendar from "../common/formfields/CasCalendar";
import CasSelect from "../common/formfields/CasSelect";
import CasTimePicker from "../common/formfields/CasTimePicker";

class CasFlightCreate extends Component {
  constructor(props) {
    super(props);
    this.submitCancelForm = this.submitCancelForm.bind(this);
    this.setAirportsCallBack = this.setAirportsCallBack.bind(this);
    this.state = {
      airportData: [],
    };
  }
  validateCancelForm(values) {
    const errors = {};
    console.log(values);
    if (values.cancelType === "") errors.cancelType = "Please choose the type";
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
    // set is submitting when API gives response back
    this.props.search();
    setSubmitting(false);
  }

  render() {
    let label = LabelConstants.cancelFormPage;

    const setInitialValues = {
      cancelType: "",
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

    return (
      <>
        <h1>{label.title}</h1>

        <Formik
          initialValues={setInitialValues}
          validate={this.validateCancelForm}
          onSubmit={this.submitCancelForm}
          
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
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2 p-field-radiobutton">
                  <CasRadioBtn
                    value="international"
                    onChange={handleChange}
                    name="cancelType"
                    id="cancelIntFlight"
                    checkedCondition={values.cancelType === "international"}
                  />
                  <label htmlFor="cancelIntFlight">{label.international}</label>
                </div>

                <div className="p-col-12 p-lg-2 p-md-2 p-field-radiobutton">
                  <CasRadioBtn
                    value="domestic"
                    onChange={handleChange}
                    name="cancelType"
                    id="cancelDomFlight"
                    checkedCondition={values.cancelType === "domestic"}
                  />
                  <label htmlFor="cancelDomFlight">{label.domestic}</label>
                </div>
                {errors.cancelType && (
                  <small className="cas-inline-err-text">
                    {errors.cancelType}
                  </small>
                )}
              </div>
              {/* Row 2 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="cancelDepDate">
                    {label.boardingStartDate}
                  </label>
                </div>
                <div className="p-col-12  p-lg-2 p-md-2">
                  <CasCalendar
                    id="cancelDepDate"
                    onChange={handleChange}
                    name="depDate"
                    showIcon={true}
                    numberOfMonths={3}
                  />
                </div>
                <div className="p-col-12  p-lg-2 p-md-4"></div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="cancelArvDate">{label.boardingEndDate}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasCalendar
                    id="cancelArvDate"
                    onChange={handleChange}
                    name="arvDate"
                    showIcon={true}
                    numberOfMonths={3}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="cancelDepAirport">{label.depAirport}</label>
                </div>
                <div className="p-col-12  p-lg-2 p-md-4">
                  <CasAirportInput
                    airportType="departure"
                    onChange={handleChange}
                    id="cancelDepAirport"
                    name="depAirport"
                    airportData={this.state.airportData}
                    value={values.depAirport}
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="cancelArrAirport">{label.arrAirport}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasAirportInput
                    airportType="arrival"
                    onChange={handleChange}
                    id="cancelArrAirport"
                    name="arvAirport"
                    airportData={this.state.airportData}
                    value={values.arvAirport}
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="cancelCarrierCD">{label.carrierCode}</label>
                </div>
                <div className="p-col-12  p-lg-2 p-md-4">
                  <CasSelect
                    id="cancelCarrierCD"
                    name="carrierCode"
                    options={carrierCodeOptions}
                    value={values.carrierCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  &nbsp;
                  </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="cancelflightNumber">{label.flightNum}</label>
                </div>
              
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasInputText
                    value={values.flightNumber}
                    id="cancelflightNumber"
                    name="flightNumber"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 6 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="cancelDepTimeStart">{label.depTimeStart}</label>
                </div>
                <div className="p-col-12  p-lg-2 p-md-4">
                  <CasTimePicker
                    id="cancelDepTimeStart"
                    onChange={handleChange}
                    name="depTimeStart"
                    value={values.depTimeStart}
                  />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">&nbsp;</div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="cancelDepTimeEnd">{label.depTimeEnd}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                <CasTimePicker
                    id="cancelDepTimeEnd"
                    onChange={handleChange}
                    name="depTimeEnd"
                    value={values.depTimeEnd}
                  />
                </div>
              </div>

              {/* Row 7 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="cancelArvTimeStart">{label.ArvTimeStart}</label>
                </div>
                <div className="p-col-12  p-lg-2 p-md-4">
                <CasTimePicker
                    id="cancelArvTimeStart"
                    onChange={handleChange}
                    name="arvTimeStart"
                    value={values.arvTimeStart}
                  />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="cancelArvTimeEnd">{label.ArvTimeEnd}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                <CasTimePicker
                    id="cancelArvTimeEnd"
                    onChange={handleChange}
                    name="arvTimeEnd"
                    value={values.arvTimeEnd}
                  />
                </div>
              </div>

              {/* Row 8 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">{label.reason}</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasSelect
                    id="cancelReason"
                    name="reason"
                    options={cancelReasonOptions}
                    value={values.reason}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="p-grid">
                <div className="p-col-12 p-lg-9 p-md-9">&nbsp;</div>
                <div className="p-col-12 p-lg-2 p-md-2">
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
