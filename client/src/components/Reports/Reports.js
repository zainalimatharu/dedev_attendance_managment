import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTodayReport, clearReport } from '../../redux/actions/report';
import moment from 'moment';
import Loading from '../Loading/Loading';
import Today from './Today';
import ThisMonth from './ThisMonth';
import Customized from './Customized';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Popper, Fade } from '@material-ui/core';
import { DateRangePicker } from 'react-date-range';

// apply custom styles to material-ui components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: '70px 0',
  },
  btn: {
    padding: '10px 20px',
    border: '1px solid #c6d2d9',
    backgroundColor: 'white',
    color: '#666',
    cursor: 'pointer',
    transitionDelay: '0.1s',
    transitionDuration: '0.5s',
    '&:not(:first-child)': {
      marginLeft: '-1px',
    },
    '&:hover': {
      backgroundColor: '#e4eaee',
    },
  },
  selected: {
    backgroundColor: '#e4eaee',
    color: 'black',
  },
}));

const Reports = ({
  getTodayReport,
  clearReport,
  report: { todayReport, thisMonthReport, loading },
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [date, setDate] = useState([
    {
      startDate: moment().startOf('week')._d,
      endDate: moment().startOf('day')._d,
      key: 'selection',
    },
  ]);
  const [selected, setSelected] = useState('today');

  useEffect(() => {
    getTodayReport();

    return function cleanUp() {
      clearReport();
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    console.log(Boolean(anchorEl));
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <Container spacing={2} maxWidth="md" className={classes.container}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
        <span>
          <Typography
            variant="button"
            gutterBottom
            className={`${classes.btn} ${
              selected === 'today' ? classes.selected : ''
            }`}
            onClick={() => setSelected('today')}
          >
            TODAY
          </Typography>
          <Typography
            variant="button"
            gutterBottom
            className={`${classes.btn} ${
              selected === 'thisMonth' ? classes.selected : ''
            }`}
            onClick={() => setSelected('thisMonth')}
          >
            THIS MONTH
          </Typography>
          <Typography
            variant="button"
            gutterBottom
            className={`${classes.btn} ${
              selected === 'customized' ? classes.selected : ''
            }`}
            onClick={() => setSelected('customized')}
          >
            CUSTOMIZED
          </Typography>
        </span>
        <span>
          <Typography
            variant="button"
            gutterBottom
            className={classes.btn}
            onClick={handleClick}
          >
            OPEN DATE SELECTOR
          </Typography>
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <DateRangePicker
                  onChange={(item) => {
                    setDate([item.selection]);
                    console.log('date changed');
                  }}
                  onShownDateChange={() => console.log('abc')}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  ranges={date}
                  direction="horizontal"
                  showDateDisplay={true}
                />
              </Fade>
            )}
          </Popper>
        </span>
      </div>
      {selected == 'today' && (
        <Today loading={loading} todayReport={todayReport} />
      )}
      {selected === 'thisMonth' && (
        <ThisMonth loading={loading} thisMonthReport={thisMonthReport} />
      )}
      {selected === 'customized' && (
        <Customized
          loading={loading}
          thisMonthReport={thisMonthReport}
          date={date}
        />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  report: state.report,
});

export default connect(mapStateToProps, { getTodayReport, clearReport })(
  Reports
);
