// importing react stuff
import React from 'react';
import Report from './Report.png';

// importing material-ui stuff
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const NoData = ({ text }) => {
  const { root, content } = useStyles();

  return (
    <Grid container className={root}>
      <Grid item className={content}>
        <img src={Report} />
      </Grid>
      <Typography style={{ color: '#666', marginTop: '10px' }}>
        {text}
      </Typography>
    </Grid>
  );
};

export default NoData;
