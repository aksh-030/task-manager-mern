import React from "react";
import { NavLink } from "react-router-dom";
import './navi.css';

//import "bootstrap/dist/css/bootstrap.css";
 
export default function Navbar() {
 return (
   <div>
     <nav className="navbar"> 
        <ul className="navbar-ul">
          <li className="nav-title">
            $$ Task Manager
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              All Tasks
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/create">
              New Task
            </NavLink>
          </li>
        </ul>
     </nav>
   </div>
 );
}