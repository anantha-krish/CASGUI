import React, { useState} from 'react';
import classNames from 'classnames';

function CasUserProfile() {
    const[expanded,setExpanded] = useState(false);
    
    return  (
        <div className="layout-profile">
            <div>
                <img src="assets/images/CAS_Logo.png" alt="" />
            </div>
            {/* <button className="p-link layout-profile-link" onClick={() => setExpanded(!expanded)}>
                <span className="username">Settings</span>
                <i className="pi pi-fw pi-cog"/>
            </button>
            <ul className={classNames({'layout-profile-expanded': expanded})}>
                <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>My Account</span></button></li>
                <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span><span className="menuitem-badge">2</span></button></li>
                <li><button className="p-link"><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
            </ul> */}
        </div>
    );
}

export default CasUserProfile;
