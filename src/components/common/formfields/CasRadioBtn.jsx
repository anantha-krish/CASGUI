import React, { Component } from "react";
import PropTypes from "prop-types";
import { RadioButton } from "primereact/radiobutton";

export class CasRadioBtn extends Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checkedCondition: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    id: "",
    value: "",
    name: "",
    checkedCondition: false,
    onChange: () => {},
  };

  render() {
    const { id, value, name, onChange, checkedCondition } = this.props;
    return (
      <RadioButton
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        checked={checkedCondition}
      />
    );
  }
}

export default CasRadioBtn;
