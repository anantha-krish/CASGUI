import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Messages } from 'primereact/messages'


export class CasMessage extends Component {
    static defaultProps={
        passRef: null,
        className:""
    }
    static propTypes={
        passRef: PropTypes.any,
        className:PropTypes.string
    }
    render() {
        const {passRef,className} = this.props;
        return (
            <Messages ref={passRef} className={className}></Messages>
        )
    }
}

export default CasMessage
