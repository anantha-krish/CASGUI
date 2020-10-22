import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Dropdown } from "primereact/dropdown";

class CasSelect extends Component {
    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.string.isRequired,
        name: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
      };
    
      static defaultProps = {
        id: "",
        value: "",
        name: "",
        options:[],
        onChange: () => {},
      };
    render() {
        const { id, value, name, onChange,options } = this.props;
        return (
            <>
            <Dropdown id={id} name={name} value={value} 
            options={options} onChange={onChange} 
            optionLabel="option" placeholder="Please Select" />
            </>
        )
    }
}

export default CasSelect
