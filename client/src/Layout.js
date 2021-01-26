// importing react stuff
import React, { useEffect, useState } from 'react';
import './layout.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// importing components
import Router from './components/Router'; //The Router
import SideNav from './components/SideNav/SideNav';
import Nav from './components/Nav/Nav';

// importing material-ui stuff
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  sideNav: {
    height: '100%',
    position: 'fixed',
    top: '50px',
    backgroundColor: '#fff',
    borderLeft: '0.2857rem solid #607d8b',
    borderRight: '1px solid #c6d2d9',
    '@media (max-width: 768px)': {
      borderLeft: '0',
      borderRight: '0',
    },
  },
  header: {
    height: '50px',
    position: 'fixed',
    zIndex: '1',
    backgroundColor: '#fff',
    borderLeft: '0.2857rem solid #607d8b',
    borderBottom: '1px solid #c6d2d9',
  },
  content: {
    padding: '45px 25px',
    marginLeft: '195px',
    marginTop: '50px',
    '@media (max-width: 768px)': {
      marginLeft: '0 !important',
    },
  },
  main: {
    height: 'calc(100vh - 50px)',
  },
});
const Layout = ({ auth: { loading, isAuthenticated } }) => {
  const { root, sideNav, main, header, content } = useStyles();

  const [contentStyle, setContentStyle] = useState({ marginLeft: '0' });

  useEffect(() => {
    if (loading || !isAuthenticated) {
      setContentStyle({ marginLeft: '0' });
    } else {
      setContentStyle({ marginLeft: '195px' });
    }
  }, [loading, isAuthenticated]);

  return (
    <div className={root}>
      <Grid container className={header}>
        <Nav />
      </Grid>
      <Grid container className={main}>
        {!loading && isAuthenticated && (
          <Grid item className={sideNav}>
            <SideNav />
          </Grid>
        )}
        <Grid item xs className={content} style={contentStyle}>
          <Router />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Layout));
