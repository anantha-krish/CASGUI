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
          <span className="layout-topbar-item-text">Settings</span>
          <span className="layout-topbar-icon pi pi-cog" />
        </button>
        <button className="p-link">
          <span className="layout-topbar-item-text">User</span>
          <span className="layout-topbar-icon pi pi-user" />
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
