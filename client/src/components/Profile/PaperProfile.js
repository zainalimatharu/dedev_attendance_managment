import React from 'react';
import Profile from './Profile';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profile: {
    marginBottom: theme.spacing(4),
    padding: `15px 30px`,
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
        userId={userId}
      />
    </Paper>
  );
};

export default PaperProfile;
