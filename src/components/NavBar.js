import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
        return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand" to="/">
                                Home
                         </Link>

                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                        <NavLink className="nav-item nav-link" to="/tweets">
                                                Tweets
                                        </NavLink>
                                        <NavLink className="nav-item nav-link" to="/trends">
                                                Trends
                                        </NavLink>

                                </div>
                        </div>
                </nav>
        );
};

export default NavBar;
