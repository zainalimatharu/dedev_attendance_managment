import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';

const Nav = ({ auth: { loading, isAuthenticated, user }, logout }) => {
  return (
    <div className="nav">
      <p className="h-2 logo">
        <Link to="/">
          <b className="">DeDev</b>
        </Link>
      </p>
      {!loading && isAuthenticated && user.admin && (
        <Link to="/addEmployee" className="nav-elms">
          <p className="h-5 nav-block">
            Add Employee
            <hr />
          </p>
        </Link>
      )}
      {!loading && isAuthenticated && (
        <Link to="/employees" className="nav-elms">
          <p className="h-5 nav-block">
            Employees
            <hr />
          </p>
        </Link>
      )}
      {!loading && !isAuthenticated && (
        <Link to="/login" className="nav-elms">
          <p className="h-5 nav-block">
            Login
            <hr />
          </p>
        </Link>
      )}
      {!loading && isAuthenticated && (
        // <Link to="/login" className="nav-elms">
        <p className="h-5 nav-block nav-elms" onClick={() => logout()}>
          Logout
          <hr />
        </p>
        // </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Nav);
