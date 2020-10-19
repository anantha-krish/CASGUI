import React, { Component } from 'react';
import { Button as CustomButton} from 'primereact/button';
import PropTypes from 'prop-types';

class CasButton extends Component {

    static propTypes = {
        id:PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string,
        className: PropTypes.string,
        hotkey: PropTypes.string,
        iconPos: PropTypes.string,
        tooltip: PropTypes.any,
        disabled: PropTypes.bool,
        style: PropTypes.any,
        onFocus:PropTypes.func,
        onBlur:PropTypes.func,
        pageId: PropTypes.string
    }

    static defaultProps = {
        disabled: false,
    };
    
   
    render () {
      const {
        id,
        label,
        icon,
        className,
        onClick,
        disabled,
        iconPos,
        tooltip,
        style,
        onFocus,
        onBlur
      } = this.props;

      return (
        <CustomButton id={id} label={label}  icon={icon} className={className}
        onClick={onClick} disabled={disabled} iconPos={iconPos} tooltip={tooltip} style={style} onFocus={onFocus} onBlur={onBlur} tabIndex={-1}/>
      )
    }
}

export default CasButton;
