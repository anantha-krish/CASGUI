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
        optionLabel:PropTypes.string,
        errorText:PropTypes.string,
        filter:PropTypes.bool,
        showClear :PropTypes.bool,
        filterBy:PropTypes.string
      };
    
      static defaultProps = {
        id: "",
        value: "",
        name: "",
        options:[],
        errorText:"",
        optionLabel:"",
        filter:false,
        showClear:false,
        filterBy:"",
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
        const { id, value, name, onChange,options,optionLabel,filter,showClear,filterBy } = this.props;
        let className = this.props.className;
        if(this.props.errorText){
          className = className + " p-invalid";
        }
        return (
            <>
            <Dropdown id={id} name={name} value={value} filter={filter} showClear={showClear} filterBy={filterBy}
            options={options} onChange={onChange} className={className}
            optionLabel={optionLabel} placeholder="Please Select" />
            {this.renderErrorText()}
            </>
        )
    }
}

export default CasSelect
