import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './style.css';

const Nav = () => {
  return (
    <div className="nav">
      <p className="h-2 logo">
        <Link to="/">
          <b className="nav-block">DeDev</b>
        </Link>
      </p>
      <Link to="/add_employee">
        <p className="h-5 nav-block">
          Employees
          <hr />
        </p>
      </Link>
      <Link to="/login">
        <p className="h-5 nav-block">
          Login
          <hr />
        </p>
      </Link>
    </div>
  );
};

export default Nav;
