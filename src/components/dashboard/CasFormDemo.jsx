import React, { Component } from "react";
import { LabelConstants } from "../../constants/constants";
import CasAirportInput from "../common/formfields/CasAirportInput";
import CasButton from "../common/formfields/CasButton";
import CasInputText from "../common/formfields/CasInputText";
import CasRadioBtn from "../common/formfields/CasRadioBtn";
import { Formik } from "formik";

export class CasFormDemo extends Component {
  
  constructor(props)
  {
    super(props);
    this.submitCancelForm=this.submitCancelForm.bind(this);
  }
  validateCancelForm(values) {
    const errors = {};
    if (values.cancelType === "") errors.cancelType = "Please choose the type";
    return errors;
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
                          checkedCondition={
                            values.cancelType === "international"
                          }
                        />
                        <label htmlFor="cancelIntFlight">
                          {label.international}
                        </label>
                      </div>

                      <div className="p-col-12 p-lg-2 p-md-2 p-field-radiobutton">
                        <CasRadioBtn
                          value="domestic"
                          onChange={handleChange}
                          name="cancelType"
                          id="cancelDomFlight"
                          checkedCondition={values.cancelType === "domestic"}
                        />
                        <label htmlFor="cancelDomFlight">
                          {label.domestic}
                        </label>
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
                        <label htmlFor="input">{label.boardingStartDate}</label>
                      </div>
                      <div className="p-col-12  p-lg-4 p-md-4">
                        <CasInputText id="input" />
                      </div>
                      <div className="p-col-12 p-lg-2 p-md-2">
                        <label htmlFor="textarea">
                          {label.boardingEndDate}
                        </label>
                      </div>
                      <div className="p-col-12 p-lg-4 p-md-4">
                        <CasInputText id="textarea" />
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="p-grid">
                      <div className="p-col-12 p-lg-2 p-md-2">
                        <label htmlFor="cancelDepAirport">
                          {label.depAirport}
                        </label>
                      </div>
                      <div className="p-col-12  p-lg-2 p-md-4">
                        <CasAirportInput
                          airportType="departure"
                          id="cancelDepAirport"
                        />
                      </div>
                    </div>

                    {/* Row 4 */}
                    <div className="p-grid">
                      <div className="p-col-12 p-lg-2 p-md-2">
                        <label htmlFor="cancelArrAirport">
                          {label.arrAirport}
                        </label>
                      </div>
                      <div className="p-col-12 p-lg-2 p-md-4">
                        <CasAirportInput
                          airportType="arrival"
                          id="cancelArrAirport"
                        />
                      </div>
                    </div>

                    {/* Row 5 */}
                    <div className="p-grid">
                      <div className="p-col-12 p-lg-2 p-md-2">
                        <label htmlFor="input">{label.carrierCode}</label>
                      </div>
                      <div className="p-col-12  p-lg-4 p-md-4">
                        <CasInputText id="input" />
                      </div>
                      <div className="p-col-12 p-lg-2 p-md-2">
                        <label htmlFor="textarea">{label.flightNum}</label>
                      </div>
                      <div className="p-col-12 p-lg-4 p-md-4">
                        <CasInputText id="textarea" />
                      </div>
                    </div>

                    {/* Row 6 */}
                    <div className="p-grid">
                      <div className="p-col-12 p-lg-2 p-md-2">
                        <label htmlFor="input">{label.depTimeStart}</label>
                      </div>
                      <div className="p-col-12  p-lg-4 p-md-4">
                        <CasInputText id="input" />
                      </div>
                      <div className="p-col-12 p-lg-2 p-md-2">
                        <label htmlFor="textarea">{label.depTimeEnd}</label>
                      </div>
                      <div className="p-col-12 p-lg-4 p-md-4">
                        <CasInputText id="textarea" />
                      </div>
                    </div>

                    {/* Row 7 */}
                    <div className="p-grid">
                      <div className="p-col-12 p-lg-2 p-md-2">
                        <label htmlFor="input">{label.ArvTimeStart}</label>
                      </div>
                      <div className="p-col-12  p-lg-4 p-md-4">
                        <CasInputText id="input" />
                      </div>
                      <div className="p-col-12 p-lg-2 p-md-2">
                        <label htmlFor="textarea">{label.ArvTimeEnd}</label>
                      </div>
                      <div className="p-col-12 p-lg-4 p-md-4">
                        <CasInputText id="textarea" />
                      </div>
                    </div>

                    {/* Row 8 */}
                    <div className="p-grid">
                      <div className="p-col-12 p-lg-2 p-md-2">
                        <label htmlFor="input">{label.reason}</label>
                      </div>
                      <div className="p-col-12  p-lg-4 p-md-4">
                        <CasInputText id="input" />
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

export default CasFormDemo;
