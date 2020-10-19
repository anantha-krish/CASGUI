import React, { Component } from 'react';
import {InputText} from 'primereact/inputtext';
import PropTypes from 'prop-types';
import {Password} from 'primereact/password';


class CasInputText extends Component {
    
    static propTypes = {
        id:PropTypes.string,
        type:PropTypes.any,
        size:PropTypes.number,
        name:PropTypes.string.isRequired,
        value:PropTypes.any,
        disabled:PropTypes.bool,
        onChange:PropTypes.func.isRequired,
        validateOnly:PropTypes.bool,
        tooltip: PropTypes.any,
        hotkey: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.any,
        customFocus:PropTypes.func,
        customBlur:PropTypes.func,
        maxLength:PropTypes.number,
        keyfilter:PropTypes.string,
        nextFocus:PropTypes.string,
        tabindex:PropTypes.number,
        password:PropTypes.bool,
        label:PropTypes.string,
        errorText:PropTypes.string,
        placeholder:PropTypes.string,
    }

    static defaultProps = {
        disabled: false,
        hotkey: '',
        id:'',
        name:'',
        value:'',
        keyfilter: null,
        nextFocus:'',
        maxLength:100,
        tabindex:null,
        password:false,
        label:"",
        errorText:"",
        placeholder:""
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
        type,
        name,
        size,
        value,
        disabled,
        onChange,
        validateOnly,
        tooltip,
        style,
        maxLength,
        keyfilter,
        nextFocus,
        tabindex,
        password,
        onFocus,
        onBlur,
        placeholder
      } = this.props;
      let className = this.props.className;
      if(this.props.errorText){
        className = className + " p-invalid";
      }

      if(password) {
        return (
          <Password id={id} placeholder={placeholder} className={className} keyfilter={keyfilter} type={type} size={size} value={value} name={name} onChange={onChange} disabled={disabled} 
            validateOnly={validateOnly} tooltip={tooltip} onFocus={onFocus} onBlur={onBlur} style={style} maxLength={maxLength} nextFocus={nextFocus} tabIndex={tabindex} feedback={false} />
        )
      } else{
        return (
          <InputText id={id} placeholder={placeholder} className={className} keyfilter={keyfilter} type={type} size={size} value={value} name={name} onChange={onChange} disabled={disabled} 
          validateOnly={validateOnly} tooltip={tooltip} onFocus={onFocus} onBlur={onBlur} style={style} maxLength={maxLength} nextFocus={nextFocus} tabIndex={tabindex} />
        )
      }
    }

    render () {
      return (
        <div className="cas-input-field">
          <span className="p-float-label">
              {this.renderField()}
              <label htmlFor={this.props.id}>{this.props.label}</label>
          </span>
          {this.renderErrorText()}
        </div>
      )
    }

  }

export default CasInputText;
