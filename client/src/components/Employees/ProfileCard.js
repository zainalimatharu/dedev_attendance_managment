import React from 'react';

import { Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '25px',
    padding: '30px',
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '120px',
    height: '120px',
  },
  name: {
    marginTop: '12px',
    textAlign: 'center',
  },
  nameText: {
    fontWeight: 'bold',
  },
  tagLine: {
    maxWidth: '70%',
    textAlign: 'center',
  },
});

const ProfileCard = ({ userName, bio, dp }) => {
  const { card, image, img, name, nameText, tagLine } = useStyles();

  return (
    <Grid item container xs={12} sm={6} md={4} className={card}>
      <Grid item xs={12} className={image}>
        <Avatar className={img}>
          {userName.split(' ')[0].charAt(0).toUpperCase()}
        </Avatar>
      </Grid>
      <Grid item xs={12} className={name}>
        <Typography className={nameText}>{userName}</Typography>
      </Grid>
      <Grid item xs={12} className={tagLine}>
        <Typography variant="caption">{bio}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
