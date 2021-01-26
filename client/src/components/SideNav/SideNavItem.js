import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// importing required redux actions
import { setNavLoading, setOpenPage } from '../../redux/actions/navigation';

const SideNavItem = ({
  children,
  text,
  style,
  linkTo,
  navigation: { openPage },
  setOpenPage,
}) => {
  return (
    <li
      className={`sidenav-item ${openPage === text ? 'open' : ''}`}
      style={style}
      onClick={() => setOpenPage(`${text}`)}
    >
      <Link to={`/${linkTo}`}>
        <div className="sidenav-item-content">
          {children}
          <span className="sidnav-item-text">{text}</span>
        </div>
      </Link>
    </li>
  );
};

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps, { setNavLoading, setOpenPage })(
  SideNavItem
);
