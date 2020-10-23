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
        errorText:PropTypes.string

    }

    static defaultProps = {
        disabled: false,
        id:'',
        name:'',
        value:'',
        errorText:'',
    };



    render () {
      const {
        id,
        onChange,
        name,
        value,
        errorText   
      } = this.props;
      return (
       
          <TimeField
          id={id}
          name={name}
          value={value}                     // {String}   required, format '00:00' or '00:00:00'
          onChange={onChange}      // {Function} required
          input={<CasInputText errorText={errorText} />} // {Element}  default: <input type="text" />
          colon=":"                        // {String}   default: ":"
                      // {Boolean}  default: false
          />
        
      )
    }

  }

export default CasTimePicker;
