// importing react stuff
import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

// importing material-ui stuff
import {
  Box,
  Grid,
  Typography,
  Avatar,
  ButtonBase,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: '1',
    marginBottom: '30px',
  },
  isPad: {
    '@media (max-width: 768px)': {
      padding: '0',
    },
    '@media (min-width: 768px)': {
      padding: '0 40px',
    },
    '@media (min-width: 992px)': {
      padding: '0 90px',
    },
  },
  name: {
    fontSize: '1.554rem',
    color: '#666',
    fontWeight: '500',
    '@media (max-width: 960px)': {
      display: 'grid',
      placeItems: 'center',
    },
  },
  h_1_a: {
    fontSize: '2.52rem',
    fontWeight: 'bold',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, San Francisco, Helvetica Neue, Helvetica, Ubuntu, Roboto, Noto, Segoe UI, Arial, sans-serif',
    marginBottom: '7px',
    display: 'inline',
  },
  profile: {
    marginBottom: theme.spacing(4),
    padding: `15px 30px`,
  },
  margin: {
    margin: '13px 0px 13px 0px',
  },
  skills: {
    padding: '0px !important',
  },
  skill: {
    display: 'inline',
    border: '1px solid #868686',
    marginRight: '10px',
    padding: '0px 5px 5px 5px',
  },
  img: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    '@media (max-width: 768px)': {
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  image: {
    height: '120px',
    width: '120px',
    fontSize: '2rem',
  },
  btn: {
    margin: '-20px 0 0 20px',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
  },
}));

const Profile = ({ name, bio, skills, hasPad, showEditBtn, userId }) => {
  const classes = useStyles();

  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 768
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  return (
    <Grid
      container
      spacing={2}
      className={`${classes.root} ${hasPad ? classes.isPad : ''}`}
    >
      <Grid item lg={2} md={3} sm={4} xs={12}>
        <ButtonBase className={classes.img}>
          <Avatar className={classes.image}>ZA</Avatar>
        </ButtonBase>
      </Grid>
      <Grid item lg={10} md={9} sm={8} xs={12} container>
        <Grid item xs container spacing={1} direction="column">
          <Grid item className={classes.name}>
            <p>{name}</p>
            {showEditBtn && (
              <Button variant="outlined" className={classes.btn}>
                <Link to={`/editProfile/${userId}`} className={classes.link}>
                  edit profile
                </Link>
              </Button>
            )}
            <Typography variant="subtitle1" gutterBottom>
              {bio}
            </Typography>
          </Grid>
          {!mobileView && (
            <Grid item container>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  Skills
                </Typography>
              </Grid>
              <span style={{ display: 'flex', flexWrap: 'wrap' }}>
                {skills.map((skill, idx) => (
                  <Box key={idx} className={classes.skill}>
                    {skill}
                  </Box>
                ))}
              </span>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
    // <Grid container spacing={2}>
    //   <Grid item xs={3}>
    //     <span className={classes.img}>
    //       <Avatar className={classes.image}>{name.charAt(0)}</Avatar>
    //     </span>
    //   </Grid>
    //   <Grid item xs={9}>
    //     <Typography className={classes.h_1_a}>{name}</Typography>
    //     {showEditBtn && (
    //       <Button variant="outlined" className={classes.btn}>
    //         <Link to={`/editProfile/${userId}`} className={classes.link}>
    //           edit profile
    //         </Link>
    //       </Button>
    //     )}
    //     <Typography variant="body1" paragraph>
    //       {bio}
    //     </Typography>
    //     <Typography variant="body1" style={{ marginBottom: '10px' }}>
    //       Skills
    //     </Typography>
    //     <Grid item container className={classes.skills}>
    //       {skills.map((skill, idx) => (
    //         <Box key={idx} className={classes.skill}>
    //           {skill}
    //         </Box>
    //       ))}
    //     </Grid>
    //   </Grid>
    // </Grid>
  );
};

export default Profile;
