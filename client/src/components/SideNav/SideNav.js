// importing react stuff
import React, { useEffect } from 'react';
import './style.css';
import { connect } from 'react-redux';

// importing material-ui stuff
import {
  Schedule,
  SettingsOutlined,
  PeopleOutline,
  PersonAddOutlined,
  BarChart,
  DashboardOutlined,
} from '@material-ui/icons';
import { Typography } from '@material-ui/core';

// importing required components
import SideNavItem from './SideNavItem';

// styling & colors
const textStyles = {
  height: '50px',
  padding: '0 20px 0 20px',
  display: 'flex',
  alignItems: 'center',
};
const cyanBorder = { borderColor: '#00bcd4' };
const orangeBorder = { borderColor: '#ff9800' };
const indigoBorder = { borderColor: '#3f51b5' };
const redBorder = { borderColor: '#f44336' };
const greenBorder = { borderColor: '#4caf50' };
const darkBorder = { borderColor: '#333' };

const SideNav = ({
  auth: { user, loading, isAuthenticated, systemRole },
  // navigation: { openPage },
}) => {
  const openPage = 'attendance';
  return (
    !loading &&
    isAuthenticated && (
      <ul className="sidenav sidenav-lg">
        <SideNavItem text="attendance" style={cyanBorder} linkTo="attendance">
          <Schedule />
        </SideNavItem>
        <SideNavItem
          text="profile"
          style={orangeBorder}
          linkTo={`profile/${user._id}`}
        >
          <SettingsOutlined />
        </SideNavItem>
        <Typography variant="overline" style={textStyles}>
          Analyze
        </Typography>
        <SideNavItem text="dashboard" style={indigoBorder} linkTo="dashboard">
          <DashboardOutlined />
        </SideNavItem>
        {systemRole === 'admin' && (
          <SideNavItem text="reports" style={redBorder} linkTo="reports">
            <BarChart />
          </SideNavItem>
        )}
        <Typography variant="overline" style={textStyles}>
          Manage
        </Typography>
        {systemRole === 'admin' && (
          <SideNavItem text="add user" style={darkBorder} linkTo="addUser">
            <PersonAddOutlined />
          </SideNavItem>
        )}
        <SideNavItem text="team" style={greenBorder} linkTo="team">
          <PeopleOutline />
        </SideNavItem>
      </ul>
    )
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // navigation: navigation,
});

export default connect(mapStateToProps)(SideNav);
