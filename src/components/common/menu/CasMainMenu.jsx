import React from 'react';
import CasSubMenu from './CasSubMenu'


const CasMainMenu =(props) => {
    return (
        <div className="layout-menu-container">
            <CasSubMenu items={props.model} className="layout-menu" onMenuItemClick={props.onMenuItemClick} root={true}/>
        </div>
    );
}
export default CasMainMenu;
