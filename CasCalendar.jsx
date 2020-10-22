import React, { Component } from 'react';
import { Calendar } from 'primereact/calendar';
import PropTypes from 'prop-types';


class CasCalendar extends Component {
    
    static propTypes = {
        id:PropTypes.string,
        onChange:PropTypes.func.isRequired,
        name:PropTypes.string.isRequired,
        value:PropTypes.any,
        size:PropTypes.number,
        disabled:PropTypes.bool,
        errorText:PropTypes.string,
        placeholder:PropTypes.string,
        className: PropTypes.string,
        showIcon : PropTypes.bool,
        numberOfMonths:PropTypes.number
    }

    static defaultProps = {
        disabled: false,
        id:'',
        name:'',
        value:'',
        errorText:"",
        placeholder:"",
    };

 
    renderErrorText() {
      if(this.props.errorText){
        return(
          <small className="cas-inline-err-text p-d-block">{this.props.errorText}</small>
        );
      }
    }

    renderField() {
      const {
        id,
        onChange,
        name,
        size,
        value,
        disabled,
        placeholder,
        showIcon,
        numberOfMonths
        
      } = this.props;
      let className = this.props.className;
      if(this.props.errorText){
        className = className + " p-invalid";
      }
      return (
        <Calendar id={id} numberOfMonths={numberOfMonths} showIcon={showIcon} placeholder={placeholder} className={className} size={size} value={value} name={name} onChange={onChange} disabled={disabled} />
      )

    }

    render () {
      return (
        <div className="cas-input-field">
          {this.renderField()}
          {this.renderErrorText()}
        </div>
      )
    }

  }

export default CasCalendar;
