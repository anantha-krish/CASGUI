import React from "react";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";

function CasTopbar(props) {
  return (
    <div className="layout-topbar clearfix">
      <button
        className="p-link layout-menu-button"
        onClick={props.onToggleMenu}
      >
        <span className="pi pi-bars" />
      </button>

      <div className="layout-topbar-icons">
        <span className="layout-topbar-search">
          <InputText type="text" placeholder="Search" />
          <span className="layout-topbar-search-icon pi pi-search" />
        </span>
        <button className="p-link">
          <span className="layout-topbar-item-text">Alerts</span>
          <span className="layout-topbar-icon pi pi-envelope" />
          <span className="layout-topbar-badge">5</span>
        </button>
        <button className="p-link">
         
        <span className="layout-topbar-icon user-icon" > <img src="assets/images/profile.png" alt="" /> </span>
         
          <span className="layout-topbar-username">Taro Sorano</span>
        </button>
      </div>
    </div>
  );
}
CasTopbar.defaultProps = {
  onToggleMenu: null,
};

CasTopbar.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
};

export default CasTopbar;
