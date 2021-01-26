import React from 'react';
import Profile from './Profile';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profile: {
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
}));

const PaperProfile = ({ name, bio, skills, hasPad }) => {
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <Profile name={name} bio={bio} skills={skills} />
    </div>
  );
};

export default PaperProfile;
