// importing react stuff
import React, { useState, useEffect } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeDevTech from './DeDevTech.png';

// importing material-ui stuff
import { Typography, Popper, Paper, List } from '@material-ui/core';
import { Drawer, Divider, Avatar, ListItem } from '@material-ui/core';
import { Schedule, SettingsOutlined } from '@material-ui/icons';
import { HelpOutline, BarChart, DashboardOutlined } from '@material-ui/icons';
import { VpnKeyOutlined, MenuRounded, PeopleOutline } from '@material-ui/icons';
import { NotificationsNone, PersonAddOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

// importing required components
import SideNavItem from '../SideNav/SideNavItem';

// importing required helper functions
import { calcAvatar } from './helpers';

// importing required redux actions
import { logout } from '../../redux/actions/auth';

// declaring left border colors for side-nav
const cyanBorder = { borderColor: '#00bcd4' };
const orangeBorder = { borderColor: '#ff9800' };
const indigoBorder = { borderColor: '#3f51b5' };
const redBorder = { borderColor: '#f44336' };
const greenBorder = { borderColor: '#4caf50' };
const darkBorder = { borderColor: '#333' };

// apply custom styles to material-ui components
const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: '#03a9f4',
    height: '32px',
    width: '32px',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
  },
  icon: {
    fontSize: '2rem',
    color: '#455a64 !important',
  },
  img: {
    display: 'flex',
    alignItems: 'center',
  },
  drawer: {
    borderLeft: '0.2857rem solid #607d8b',
    width: '195px',
  },
  list: {
    width: 195,
    height: '100%',
    borderLeft: '0.2857rem solid #607d8b',
  },
  subHeading: {
    height: '50px',
    padding: '0 20px 0 20px',
    display: 'flex',
    alignItems: 'center',
  },
  popper_menu: {
    backgroundColor: 'white',
  },
  popper_menu_item: {
    textDecoration: 'none',
    color: 'inherit',
  },
  popper_text: {
    color: '#666',
  },
}));

const Nav = ({
  auth: { user, loading, isAuthenticated, systemRole },
  logout,
}) => {
  const classes = useStyles();

  const [state, setState] = useState({
    drawerOpen: false,
    mobileView: false,
  });

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 768
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    console.log(Boolean(anchorEl));
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  const logo = (onClickEnabled) => (
    <div className="nav-menu-logo">
      <span className="nav-menu-item">
        {state.mobileView ? (
          <MenuRounded
            className={classes.icon}
            onClick={() => {
              if (onClickEnabled) setState({ ...state, drawerOpen: true });
            }}
          />
        ) : (
          <MenuRounded
            className={classes.icon}
            onClick={() => {
              console.log('abc');
            }}
          />
        )}
        <div className={classes.img}>
          <img src={DeDevTech} className="nav-menu-item-image" />
          <p className="h-6">DeDevTech</p>
        </div>
      </span>
    </div>
  );

  const items = () => (
    <div className="nav-menu-items">
      {!state.mobileView && (
        <span className="nav-menu-item-with-border">
          <HelpOutline />
        </span>
      )}
      {!loading && isAuthenticated && (
        <span className="nav-menu-item-with-border">
          <NotificationsNone />
        </span>
      )}
      {!loading && isAuthenticated && (
        <span className="nav-menu-item-without-border">
          <Avatar className={classes.avatar} onClick={handleClick}>
            {calcAvatar(user.name)}
          </Avatar>
          <PopperMenu
            id={id}
            open={open}
            anchorEl={anchorEl}
            user={user}
            handleClick={handleClick}
            logout={logout}
          />
        </span>
      )}
      {!loading && !isAuthenticated && (
        <span className="nav-menu-item-without-border">
          <Link to="/login">
            <VpnKeyOutlined />
          </Link>
        </span>
      )}
    </div>
  );

  return (
    <React.Fragment>
      <div className="top-nav-menu">
        {isAuthenticated ? logo(true) : logo(false)}
        {items()}
      </div>

      {/* ---> drawer menu start <--- */}
      <Drawer
        anchor="left"
        open={state.drawerOpen}
        onClose={() => setState({ ...state, drawerOpen: false })}
        className={classes.drawer}
      >
        <div
          className={classes.list}
          role="presentation"
          onClick={() => setState({ ...state, drawerOpen: false })}
          onKeyDown={() => setState({ ...state, drawerOpen: false })}
        >
          <List style={{ padding: '0' }}>
            <SideNavItem
              text="attendance"
              style={cyanBorder}
              linkTo="attendance"
            >
              <Schedule />
            </SideNavItem>
            <SideNavItem text="profile" style={orangeBorder} linkTo="profile">
              <SettingsOutlined />
            </SideNavItem>
            <Typography variant="overline" className={classes.subHeading}>
              Analyze
            </Typography>
            <SideNavItem
              text="dashboard"
              style={indigoBorder}
              linkTo="dashboard"
            >
              <DashboardOutlined />
            </SideNavItem>
            {systemRole === 'admin' && (
              <SideNavItem text="reports" style={redBorder} linkTo="reports">
                <BarChart />
              </SideNavItem>
            )}
            <Typography variant="overline" className={classes.subHeading}>
              Manage
            </Typography>
            {systemRole === 'admin' && (
              <SideNavItem text="add user" style={darkBorder} linkTo="assUser">
                <PersonAddOutlined />
              </SideNavItem>
            )}
            <SideNavItem text="team" style={greenBorder} linkTo="team">
              <PeopleOutline />
            </SideNavItem>
          </List>
        </div>
      </Drawer>
      {/* ---> drawer menu end <--- */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const PopperMenu = ({ id, open, anchorEl, user, handleClick, logout }) => {
  const classes = useStyles();

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      transition
      className={classes.popper_menu}
    >
      <List component={Paper} elevation={3} style={{ padding: '14px 3px' }}>
        <ListItem className={classes.popper_text}>
          <Typography variant="body2">{user.name}</Typography>
        </ListItem>
        <ListItem style={{ marginTop: '-6px', color: '#999' }}>
          <Typography variant="caption">{user.email}</Typography>
        </ListItem>
        <Divider />
        <Link
          to="/dashboard"
          className={classes.popper_menu_item}
          onClick={handleClick}
        >
          <ListItem button className={classes.popper_text}>
            <Typography variant="body2">Dashboard</Typography>
          </ListItem>
        </Link>
        <Link
          to={`profile/${user._id}`}
          className={classes.popper_menu_item}
          onClick={handleClick}
        >
          <ListItem button className={classes.popper_text}>
            <Typography variant="body2">Edit Profile</Typography>
          </ListItem>
        </Link>
        <Divider />
        <ListItem
          button
          onClick={() => {
            handleClick();
            logout();
          }}
          className={classes.popper_text}
        >
          <Typography variant="body2">Log out</Typography>
        </ListItem>
      </List>
    </Popper>
  );
};

export default connect(mapStateToProps, { logout })(Nav);
