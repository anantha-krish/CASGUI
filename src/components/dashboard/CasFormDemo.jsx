import React, { Component } from "react";
import CasButton from "../common/formfields/CasButton";
import CasInputText from "../common/formfields/CasInputText";

export class CasFormDemo extends Component {
  render() {
    return (
      <div className="p-fluid">
        <div className="p-grid">
          <div className="p-col-12">
            <div className="card card-w-title">
              <h1>Cas Form Demo</h1>
              {/* Row 1 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">Input</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasInputText id="input" />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="textarea">Textarea</label>
                </div>
                <div className="p-col-12 p-lg-4 p-md-4">
                  <CasInputText id="textarea" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">Input</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasInputText id="input" />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="textarea">Textarea</label>
                </div>
                <div className="p-col-12 p-lg-4 p-md-4">
                  <CasInputText id="textarea" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">Input</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasInputText id="input" />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="textarea">Textarea</label>
                </div>
                <div className="p-col-12 p-lg-4 p-md-4">
                  <CasInputText id="textarea" />
                </div>
              </div>

              {/* Row 4 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">Input</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasInputText id="input" />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="textarea">Textarea</label>
                </div>
                <div className="p-col-12 p-lg-4 p-md-4">
                  <CasInputText id="textarea" />
                </div>
              </div>

              {/* Row 5 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">Input</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasInputText id="input" />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="textarea">Textarea</label>
                </div>
                <div className="p-col-12 p-lg-4 p-md-4">
                  <CasInputText id="textarea" />
                </div>
              </div>

              {/* Row 6 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">Input</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasInputText id="input" />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="textarea">Textarea</label>
                </div>
                <div className="p-col-12 p-lg-4 p-md-4">
                  <CasInputText id="textarea" />
                </div>
              </div>

              {/* Row 7 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">Input</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasInputText id="input" />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="textarea">Textarea</label>
                </div>
                <div className="p-col-12 p-lg-4 p-md-4">
                  <CasInputText id="textarea" />
                </div>
              </div>

              {/* Row 8 */}
              <div className="p-grid">
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="input">Input</label>
                </div>
                <div className="p-col-12  p-lg-4 p-md-4">
                  <CasInputText id="input" />
                </div>
                <div className="p-col-12 p-lg-2 p-md-2">
                  <label htmlFor="textarea">Textarea</label>
                </div>
                <div className="p-col-12 p-lg-4 p-md-4">
                  <CasInputText id="textarea" />
                </div>
              </div>

              <div className="p-grid">
                <div className="p-col">&nbsp;</div>
              </div>
              <div className="p-grid">
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
