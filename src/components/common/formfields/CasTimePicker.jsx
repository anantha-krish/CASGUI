import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeField from 'react-simple-timefield';
import CasInputText from './CasInputText';

class CasTimePicker extends Component {
    
    static propTypes = {
        id:PropTypes.string,
        onChange:PropTypes.func.isRequired,
        name:PropTypes.string.isRequired,
        value:PropTypes.any,
        disabled:PropTypes.bool,
        errorText:PropTypes.string,
        placeholder:PropTypes.string,
        className: PropTypes.string,

    }

    static defaultProps = {
        disabled: false,
        id:'',
        name:'',
        value:'',
        errorText:"",
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
        value,

        
      } = this.props;
      let className = this.props.className;
      if(this.props.errorText){
        className = className + " p-invalid";
      }
      return (
        <TimeField
        id={id}
        name={name}
        value={value}                     // {String}   required, format '00:00' or '00:00:00'
        onChange={onChange}      // {Function} required
        input={<CasInputText />} // {Element}  default: <input type="text" />
        colon=":"                        // {String}   default: ":"
                         // {Boolean}  default: false
        />
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

export default CasTimePicker;
