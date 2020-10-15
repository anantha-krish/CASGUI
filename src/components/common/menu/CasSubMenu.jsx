import React, { useState} from 'react';
import {NavLink} from 'react-router-dom'
import classNames from 'classnames';

const CasSubMenu =(props) => {
    const[activeIndex,setActiveIndex] = useState(null);

    function onMenuItemClick(event, item, index) {
        //avoid processing disabled items
        if(item.disabled) {
            event.preventDefault();
            return true;
        }
                        
        //execute command
        if(item.command) {
            item.command({originalEvent: event, item: item});
        }

        if(index === activeIndex)
            setActiveIndex(null);
        else
            setActiveIndex(index);

        if(props.onMenuItemClick) {
            props.onMenuItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

	function renderLinkContent(item) {
		let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
		let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;

		return (
			<React.Fragment>
				<i className={item.icon}></i>
				<span>{item.label}</span>
				{submenuIcon}
				{badge}
			</React.Fragment>
		);
	}

	function renderLink(item, i) {
		let content = renderLinkContent(item);

		if (item.to) {
			return (
				<NavLink activeClassName="active-route" to={item.to} onClick={(e) => onMenuItemClick(e, item, i)} exact target={item.target}>
                    {content}
                </NavLink>
			)
		}
		else {
			return (
				<a href={item.url} onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
					{content}
				</a>
			);

		}
	}
    
    
    let items = props.items && props.items.map((item, i) => {
        let active = activeIndex === i;
        let styleClass = classNames(item.badgeStyleClass, {'active-menuitem': active && !item.to});

        return (
            <li className={styleClass} key={i}>
                {item.items && props.root===true && <div className='arrow'></div>}
                {renderLink(item, i)}
                <CasSubMenu items={item.items} onMenuItemClick={props.onMenuItemClick}/>
            </li>
        );
    });
    
    return items ? <ul className={props.className}>{items}</ul> : null;    
    
}

export default CasSubMenu;
