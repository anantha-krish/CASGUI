import { Formik } from "formik";
import React, { Component } from "react";
import { ErrorConstants, LabelConstants } from "../../constants/constants";
import { AirportService, FlightInfoService } from "../../service/services";
import CasAirportInput from "../common/formfields/CasAirportInput";
import CasButton from "../common/formfields/CasButton";
import CasCalendar from "../common/formfields/CasCalendar";
import CasInputText from "../common/formfields/CasInputText";
import CasTimePicker from "../common/formfields/CasTimePicker";
import { FileUpload } from "primereact/fileupload";
import { Messages } from "primereact/messages";
import CasFileUpload from "../common/formfields/CasFileUpload";
import CasMessage from "../common/messages/CasMessage";

class CasFlightCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airportData: [],
      isEditMode: false,
      flightInfo: {},
    };
    this.submitFlightForm = this.submitFlightForm.bind(this);
    this.setAirportsCallBack = this.setAirportsCallBack.bind(this);
    this.setExistingFlightInfo = this.setExistingFlightInfo.bind(this);
    this.setCreateMode = this.setCreateMode.bind(this);
  }

  setExistingFlightInfo(dbFlightInfo) {
    this.setState({
      flightInfo: {
        id: dbFlightInfo.id,
        flightNumber: dbFlightInfo.flightNumber,
        depDate: new Date(dbFlightInfo.depDate),
        depTime: dbFlightInfo.depTime,
        depAirport: dbFlightInfo.depAirport,
        arvDate: new Date(dbFlightInfo.arvDate),
        arvTime: dbFlightInfo.arvTime,
        arvAirport: dbFlightInfo.arvAirport,
        resource: dbFlightInfo.resource,
        file: dbFlightInfo.file,
      },
      isEditMode: true,
    });
  }

  setCreateMode() {
    this.setState({
      isEditMode: false,
      flightInfo: {
        flightNumber: "",
        depDate: "",
        depTime: "00:00",
        depAirport: "",
        arvDate: "",
        arvTime: "00:00",
        arvAirport: "",
        resource: "",
        file: "",
      },
    });
  }

  validateFlightForm(values) {
    const errors = {};

    if (!values.depDate) {
      errors.depDate = ErrorConstants.CAS_GUI_ERR_INV_DATE;
    }

    if (!values.arvDate) {
      errors.arvDate = ErrorConstants.CAS_GUI_ERR_INV_DATE;
    }

    if (values.arvTime === values.depTime) {
      errors.depTime = ErrorConstants.CAS_GUI_ERR_INV_TIME_DUR;
      errors.arvTime = ErrorConstants.CAS_GUI_ERR_INV_TIME_DUR;
    }

    if (!values.arvAirport) {
      errors.arvAirport = ErrorConstants.CAS_GUI_ERR_NO_AIRPORT;
    }

    if (!values.depAirport) {
      errors.depAirport = ErrorConstants.CAS_GUI_ERR_NO_AIRPORT;
    }

    if (!values.flightNumber) {
      errors.flightNumber = ErrorConstants.CAS_GUI_ERR_NO_FLIGHT;
    }

    if (!values.resource) {
      errors.resource = ErrorConstants.CAS_GUI_ERR_NO_RESOURC;
    }

    if (!values.file) {
      errors.file = ErrorConstants.CAS_GUI_ERR_INV_UPLOAD;
    }
    return errors;
  }

  setAirportsCallBack(airportData) {
    this.setState({
      airportData,
    });
  }

  componentDidMount() {
    AirportService.getAllAirports(this.setAirportsCallBack);
    let flightId = this.props.match.params.id;
    if (this.props.match.params.mode === "add") {
      this.setCreateMode();
    } else if (flightId && this.props.match.params.mode === "edit") {
      FlightInfoService.getFlightInfoById(flightId, this.setExistingFlightInfo);
    }
  }

  componentDidUpdate(prevprops) {
    if (this.props.match.params.mode !== prevprops.match.params.mode) {
      this.setCreateMode();
    }
  }

  submitFlightForm(values, { setSubmitting }) {
    debugger;
  
    if (!this.state.isEditMode) {
      FlightInfoService.createNewFlightInfo(values).then((data) => {
        setSubmitting(false);
        this.flightCreationMessage.show({
          severity: "success",
          summary: "Saved->",
          detail: "Flight Information has been saved successfully",
          life: 5000,
        });
      });
    } else {
      FlightInfoService.updateFlightInfo(values).then((data) => {
        setSubmitting(false);
        this.flightCreationMessage.show({
          severity: "success",
          summary: "Updated->",
          detail: `Flight info id : ${data.id} has been updated by user`,
          life: 5000,
        });
      });
    }
  }

  render() {
    let label = LabelConstants.flightFormPage;
    const setInitialValues = this.state.flightInfo;
    let headerLabel = !this.state.isEditMode
      ? "Create New Flight"
      : "Update The Flight";

    return (
      <>
        <Formik
          initialValues={setInitialValues}
          validate={this.validateFlightForm}
          onSubmit={this.submitFlightForm}
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,

            isSubmitting,

            /* and other goodies */
          }) => (
            <div className="p-grid form-container">
             <CasMessage passRef={(el)=>(this.flightCreationMessage=el)}
              className="forms-message"
              ></CasMessage>
              <div className="p-col-12">
                <div className="card card-w-title">
                  <div className="p-grid">
                    <div className="p-col-12">
                      <span>
                        <h1>{headerLabel}</h1>{" "}
                      </span>
                    </div>
                  </div>

                  {/* Row 1 */}

                  {/* Row 2 */}
                  <div className="p-grid input-fields-container">
                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightDepAirport">
                        {label.depAirport}
                      </label>
                    </div>
                    <div className="p-col-6  p-lg-2 p-md-2">
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
                        value={values.depDate}
                        errorText={errors.depDate}
                      />
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
                        errorText={errors.depTime}
                      />
                    </div>

                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightArrAirport">
                        {label.arvAirport}
                      </label>
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2">
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
                        value={values.arvDate}
                        errorText={errors.arvDate}
                      />
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
                        errorText={errors.arvTime}
                      />
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
                        errorText={errors.flightNumber}
                      />
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
                        errorText={errors.resource}
                      />
                    </div>
                    <div className="p-col-6 p-lg-4 p-md-4 form-field-label">
                      &nbsp;
                    </div>
                    <div className="p-col-6 p-lg-2 p-md-2 form-field-label">
                      <label htmlFor="flightfile">{label.upload}</label>
                    </div>
                    <CasFileUpload
                      onUpload={(event) => {
                        setFieldValue("file", event.files[0].name);
                      }}
                      fileName={values.file}
                      errorText={errors.file}
                    />
                  </div>

                  <div className="p-grid form-field-button">
                    <div className="p-col-12 ">
                      <div className="float-right">
                        <CasButton
                          label="Save"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

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
