import React from 'react';
import './style.css';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfilePhoto from '../Dashboard/ProfilePhoto.jpg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: '1',
    marginBottom: '30px',
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
    display: 'grid',
    placeItems: 'center',
  },
  image: {
    height: theme.spacing(22),
    width: theme.spacing(22),
    fontSize: '4rem',
  },
  btn: {
    margin: '-20px 0 0 20px',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
  },
}));

const PaperProfile = ({ name, bio, skills, showEditBtn, userId }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.profile}>
      <Profile
        name={name}
        bio={bio}
        skills={skills}
        showEditBtn={showEditBtn}
        userid={userId}
      />
    </Paper>
  );
};

const Profile = ({ name, bio, skills, showEditBtn, userId }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Avatar className={classes.image}>{name.charAt(0)}</Avatar>
      </Grid>
      <Grid item xs={9}>
        <Typography className={classes.h_1_a}>{name}</Typography>
        {showEditBtn && (
          <Button variant="outlined" className={classes.btn}>
            <Link to={`/editProfile/${userId}`} className={classes.link}>
              edit profile
            </Link>
          </Button>
        )}
        <Typography variant="body1" paragraph>
          {bio}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '10px' }}>
          Skills
        </Typography>
        <Grid item container className={classes.skills}>
          {skills.map((skill, idx) => (
            <Box key={idx} className={classes.skill}>
              {skill}
            </Box>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export { PaperProfile, Profile };
