import React, { Fragment, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import {
  Menu,
  BarChartOutlined,
  PersonAdd,
  ListSharp,
  LockOpen,
  ExitToApp,
  PersonOutline,
} from '@material-ui/icons';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Fade,
  Popper,
} from '@material-ui/core';

// apply custom styles to material-ui components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  user_subnav: {
    backgroundColor: 'white',
  },
  menu_item: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const NewNav = ({ auth: { loading, isAuthenticated, user }, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const openCurtainMenu = () => {
    document.querySelectorAll('.curtain-menu')[0].style.width = '100vw';
  };

  const closeCurtainMenu = () => {
    document.querySelectorAll('.curtain-menu')[0].style.width = '0';
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    console.log(Boolean(anchorEl));
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <Fragment>
      <div className="app-bar-lg">
        <div className="nav-left">
          <h2>DeDev</h2>
        </div>
        <div className="nav-right">
          {!loading && isAuthenticated && user.admin && (
            <Link to="/reports" className="nav-item">
              <span className="nav-item">Reports</span>
            </Link>
          )}
          {!loading && isAuthenticated && user.admin && (
            <Link to="/addEmployee" className="nav-item">
              <spa>Add Employee</spa>
            </Link>
          )}
          {!loading && isAuthenticated && (
            <Link to="/employees" className="nav-item">
              <spa>Employees</spa>
            </Link>
          )}
          {!loading && !isAuthenticated && (
            <Link to="/login" className="nav-item">
              <spa>Login</spa>
            </Link>
          )}
          {!loading && isAuthenticated && (
            <span style={{ padding: '10px 15px', cursor: 'pointer' }}>
              <Avatar
                className="avatar"
                style={{ width: '30px', height: '30px' }}
                onClick={handleClick}
              >
                A
              </Avatar>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom-end"
                transition
                className={classes.user_subnav}
              >
                <List component="div">
                  <Link
                    to="/dashboard"
                    className={classes.menu_item}
                    onClick={handleClick}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <PersonOutline />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                  </Link>
                  <Link
                    to={`editProfile/${user._id}`}
                    className={classes.menu_item}
                    onClick={handleClick}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <PersonOutline />
                      </ListItemIcon>
                      <ListItemText primary="Edit Profile" />
                    </ListItem>
                  </Link>
                  <Divider variant="middle" />
                  <ListItem
                    button
                    onClick={() => {
                      handleClick();
                      logout();
                    }}
                  >
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Popper>
            </span>
          )}
        </div>
      </div>
      <div className="app-bar-sm">
        <div className="nav-left">
          <Menu
            fontSize="small"
            onClick={() => openCurtainMenu()}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="nav-right">
          <h2>Dedev</h2>
        </div>
        <div style={{ marginRight: '10px' }}>
          {!loading && isAuthenticated && (
            <span style={{ padding: '10px 15px', cursor: 'pointer' }}>
              <Avatar
                className="avatar"
                style={{ width: '25px', height: '25px' }}
                onClick={handleClick}
              >
                A
              </Avatar>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom-end"
                transition
                className={classes.user_subnav}
              >
                <List component="div">
                  <Link
                    to="/dashboard"
                    className={classes.menu_item}
                    onClick={handleClick}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <PersonOutline />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                  </Link>
                  <Link
                    to={`editProfile/${user._id}`}
                    className={classes.menu_item}
                    onClick={handleClick}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <PersonOutline />
                      </ListItemIcon>
                      <ListItemText primary="Edit Profile" />
                    </ListItem>
                  </Link>
                  <Divider variant="middle" />
                  <ListItem
                    button
                    onClick={() => {
                      handleClick();
                      logout();
                    }}
                  >
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Popper>
            </span>
          )}
        </div>
      </div>
      <div className="curtain-menu" onClick={() => closeCurtainMenu()}>
        <div className="menu-content">
          <List component="nav" className="curtain-menu-container">
            <Link to="/" className="sm-nav-item">
              <ListItem button onClick={() => closeCurtainMenu()}>
                <ListItemIcon>
                  <Menu onClick={() => closeCurtainMenu()} />
                </ListItemIcon>
                <ListItemText primary="Dedev" />
              </ListItem>
            </Link>
            <Divider variant="middle" />

            {!loading && isAuthenticated && user.admin && (
              <Link to="/reports" className="sm-nav-item">
                <ListItem button onClick={() => closeCurtainMenu()}>
                  <ListItemIcon>
                    <BarChartOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Reports" />
                </ListItem>
              </Link>
            )}

            {!loading && isAuthenticated && user.admin && (
              <Link to="/addEmployee" className="sm-nav-item">
                <ListItem button onClick={() => closeCurtainMenu()}>
                  <ListItemIcon>
                    <PersonAdd />
                  </ListItemIcon>
                  <ListItemText primary="Add Employee" />
                </ListItem>
              </Link>
            )}

            {!loading && isAuthenticated && (
              <Link to="/employees" className="sm-nav-item">
                <ListItem button onClick={() => closeCurtainMenu()}>
                  <ListItemIcon>
                    <ListSharp />
                  </ListItemIcon>
                  <ListItemText primary="Employees" />
                </ListItem>
              </Link>
            )}

            {!loading && !isAuthenticated && (
              <Link to="/login" className="sm-nav-item">
                <ListItem button onClick={() => closeCurtainMenu()}>
                  <ListItemIcon>
                    <LockOpen />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
              </Link>
            )}

            {!loading && isAuthenticated && (
              <ListItem
                button
                onClick={() => {
                  logout();
                  closeCurtainMenu();
                }}
              >
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NewNav);
