import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";

class CasTopbar extends Component {
  static propTypes = {
    onToggleMenu: PropTypes.func.isRequired,
  };


  static defaultProps = {
    onToggleMenu: () => {},
  };

  render() {
    let menuToggleClassName = "pi pi-chevron-left";
    if (this.props.staticMenuInactive) {
      menuToggleClassName = "pi pi-chevron-right";
    }
    return (
      <div>
        <div className="layout-topbar-left clearfix">
          <span className="layout-topbar-logo-name">CAS GUI</span>
          <button
            className="p-link layout-menu-button"
            onClick={this.props.onToggleMenu}
          >
            <span className={menuToggleClassName} />
          </button>
        </div>
        <div className="layout-topbar clearfix">
          <div className="layout-topbar-icons">
            <span className="layout-topbar-search">
              <InputText type="text" placeholder="Search" />
              <span className="layout-topbar-search-icon pi pi-search" />
            </span>
           {/*  <button className="p-link">
              <span className="layout-topbar-item-text">Events</span>
              <span className="layout-topbar-icon pi pi-calendar" />
              <span className="layout-topbar-badge">5</span>
            </button>
         */}
      {/*       <button className="p-link">
              <span className="layout-topbar-item-text">User</span>
              <span className="layout-topbar-icon pi pi-user" />
            </button> */}
                <button className="p-link">
              <span className="layout-topbar-item-text">Settings</span>
             {/*  <span className="layout-topbar-icon pi pi-cog" /> */}
            </button>

            <span className="dropdown">
            <button className="p-link dropbtn">
              <span className="layout-topbar-item-text" onClick={()=>this.setState({isTopMenuClick:!this.state.isTopMenuClick})}>My Account</span>
            {/*   <span className="layout-topbar-icon pi pi-bars" /> */}
            </button>
      
              <div class="dropdown-content"  /* style={{display:this.state.isTopMenuClick?"block":"none"}} */>
              <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Profile</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span><span className="menuitem-badge">2</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
              </div>
              </span>
            
            {/*
            <button className="p-link">
              <span className="layout-topbar-icon user-icon">
                <img src={require('../../../assets/images/profile.png') } alt="User Profile" />
              </span>
              <span className="layout-topbar-username">Taro Sorano</span>
            </button>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default CasTopbar;
