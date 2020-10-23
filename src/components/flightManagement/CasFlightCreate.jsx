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
    this.submitFlightForm = this.submitFlightForm.bind(this);
    this.setAirportsCallBack = this.setAirportsCallBack.bind(this);
    this.state = {
      airportData: [],
    };
  }
  validateFlightForm(values) {
    const errors = {};
    console.log(values);
    if (values.flightType === "") errors.flightType = "Please choose the type";
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
    this.props.search();
    setSubmitting(false);
  }

  render() {
    let label = LabelConstants.flightFormPage;

    const setInitialValues = {
      flightType: "",
    };

    let carrierCodeOptions = [
      {
        option: "test1",
      },
      { option: "test2" },
    ];

    let flightReasonOptions = [
      {
        option: "test1",
      },
      { option: "test2" },
    ];

    return (
      <>
        <h1>{label.title}</h1>
        <br />
        <br />
        <Formik
          initialValues={setInitialValues}
          validate={this.validateFlightForm}
          onSubmit={this.submitFlightForm}
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
                  />
                </div>
                <div className="p-col-12  p-lg-2 p-md-4">&nbsp;</div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightDepTime">{label.depTime}</label>
                </div>
                <div className="p-col-12  p-lg-2 p-md-4">
                  <CasTimePicker
                    id="flightDepTime"
                    onChange={handleChange}
                    name="depTime"
                    value={values.depTime}
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
                  />
                </div>
                <div className="p-col-12  p-lg-2 p-md-4">&nbsp;</div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightArvTimeEnd">{label.arvTime}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasTimePicker
                    id="flightArvTimeEnd"
                    onChange={handleChange}
                    name="arvTimeEnd"
                    value={values.arvTimeEnd}
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightflightNumber">{label.flightNum}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasInputText
                    value={values.flightNumber}
                    id="flightflightNumber"
                    name="flightNumber"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightflightNumber">{label.resource}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasInputText
                    value={values.flightNumber}
                    id="flightflightNumber"
                    name="flightNumber"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="flightflightNumber">{label.upload}</label>
                </div>
                <div className="p-col-12 p-lg-2 p-md-4">
                  <CasInputText
                    value={values.flightNumber}
                    id="flightflightNumber"
                    name="flightNumber"
                    onChange={handleChange}
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
