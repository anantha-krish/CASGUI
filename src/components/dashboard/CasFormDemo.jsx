import React, { Component } from "react";
import { LabelConstants } from "../../constants/constants";
import CasButton from "../common/formfields/CasButton";
import CasInputText from "../common/formfields/CasInputText";

export class CasFormDemo extends Component {
  render() {
    let label = LabelConstants.cancelFormPage;
    let errTest = "Lorem ipsum dolor sit amet consectetur, adipisicing elit.";
    return (
      <div className="p-fluid">
        <div className="p-grid">
          <div className="p-col-12">
            <div className="card card-w-title">
              <h1>{label.title}</h1>
              {/* Row 1 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">{label.region}</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasInputText errorText={errTest} id="input" />
                </div>
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
                  <label htmlFor="textarea">{label.boardingEndDate}</label>
                </div>
                <div className="p-col-12 p-lg-4 p-md-4">
                  <CasInputText id="textarea" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">{label.depAirport}</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasInputText id="input" />
                </div>
              </div>

              {/* Row 4 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="textarea">{label.arrAirport}</label>
                </div>
                <div className="p-col-12 p-lg-4 p-md-4">
                  <CasInputText id="textarea" />
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
                  <CasButton label="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CasFormDemo;
