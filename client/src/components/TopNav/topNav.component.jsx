import React from "react";
import { NavLink } from "react-router-dom";

const TopNav = (props) => (
  <header>
    <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom border-dark shadow-sm ml-0 pl-0">
      <button
        className="btn btn-link bg-white border-right"
        type="button"
        onClick={props.handleSideNavToggle}
        aria-controls="sidebarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <NavLink exact to="/" className="navbar-brand ml-2 h1 text-secondary">
        {" "}
        Project Management
      </NavLink>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropleft">
            <a
              className="nav-link dropdown-toggle"
              href="."
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user mr-2"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <p className="dropdown-item" href="#">
                Log Out
              </p>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default TopNav;
