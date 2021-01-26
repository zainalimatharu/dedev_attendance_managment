import React from 'react';

// importing material-ui stuff
import { Grid, Paper, Tooltip } from '@material-ui/core';
import { LockOutlined, Check } from '@material-ui/icons';

// importing material-ui classes
import useStyles from './styles';

const Alert = ({ text, color, children, varificationStatus }) => {
  // initialize material-ui classes
  const { alert, blockQoute, status } = useStyles();
  return (
    <Grid
      item
      container
      xs={12}
      component={Paper}
      square
      elevation={0}
      variant="outlined"
      className={alert}
    >
      <Grid
        item
        xs
        className={blockQoute}
        container
        style={{ borderLeft: `0.2rem solid ${color}` }}
      >
        <Grid item style={{ marginRight: '20px' }}>
          {children}
        </Grid>
        <Grid item xs>
          {text}
        </Grid>
      </Grid>
      <Tooltip title="Verified" placement="left">
        <Grid item className={status} style={{ backgroundColor: color }}>
          <Check />
        </Grid>
      </Tooltip>
    </Grid>
  );
};

export default Alert;
