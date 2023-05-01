import React from 'react';

import { NavLink } from 'react-router-dom';

const SideNav = (props) => (
    <div >
    <aside id="sidebar" className={props.handleSideNavWidth(props.sideNavWidth)}>
        <ul className="list-unstyled components">
            <li>
                <NavLink exact to="/" activeClassName="active">
                    <i className="fas fa-th text-light mr-3"></i>
                    Categories
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/App/Projects" activeClassName="active">
                    <i className="fas fa-project-diagram text-light mr-3"></i>
                    Projects
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/App/Tasks" activeClassName="active">
                    <i className="fas fa-tasks text-light mr-3"></i>
                    Project Tasks
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/App/WorkOrders" activeClassName="active">
                    <i className="far fa-list-alt text-light mr-3"></i>
                    Work Orders
                </NavLink>
            </li>
        </ul>
    </aside>
</div>
);

export default SideNav;