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
        errorText:PropTypes.string,
      };
    
      static defaultProps = {
        id: "",
        value: "",
        name: "",
        options:[],
        errorText:"",
        onChange: () => {},
      };
    
     renderErrorText() {
      if(this.props.errorText){
        return(
          <small className="cas-inline-err-text p-d-block">{this.props.errorText}</small>
        );
      }
    }
    render() {
        const { id, value, name, onChange,options } = this.props;
        let className = this.props.className;
        if(this.props.errorText){
          className = className + " p-invalid";
        }
        return (
            <>
            <Dropdown id={id} name={name} value={value} 
            options={options} onChange={onChange} className={className}
            optionLabel="option" placeholder="Please Select" />
            {this.renderErrorText()}
            </>
        )
    }
}

export default CasSelect
