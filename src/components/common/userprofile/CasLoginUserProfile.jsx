import React, { Component} from 'react';
import classNames from 'classnames';



class CasLoginUserProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        return  (
            <div className="layout-profile">
                <div>
                    <img src={require('../../../assets/images/profile.jpg')} alt="" />
                </div>
                <button className="p-link layout-profile-link" onClick={this.onClick}>
                    <span className="username">Taro Sorano</span>
                    <i className={classNames({'pi pi-fw pi-chevron-down': !this.state.expanded, 'pi pi-fw pi-chevron-up': this.state.expanded})} />
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}

export default CasLoginUserProfile;
