// importing react stuff
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DateRange, DateRangePicker } from 'react-date-range';

// importing material-ui stuff
import { Grid, Typography, Popper, Fade } from '@material-ui/core';
import { DateRangeOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btns: {
    // flex: '0 auto content',
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
    '@media (max-width: 768px)': {
      fontSize: '0.6rem',
    },
  },
  hideOnSmall: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  selected: {
    backgroundColor: '#e4eaee',
    color: 'black',
  },
  icon: {
    padding: '7px 20px !important',
    marginTop: '-6px',
    display: 'grid',
    gridTemplateColumns: '1fr 5fr',
    '@media (max-width: 768px)': {
      marginTop: '0px',
    },
  },
  iconSvg: {
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
    },
  },
  filter: {
    backgroundColor: '#03a9f4',
    padding: '10px 20px',
    color: 'white',
    cursor: 'pointer',
    marginBottom: '25px',
  },
  filterWrapper: {
    backgroundColor: 'white',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    padding: '20px 0',
  },
});

const Options = ({ date, setDate, openTab, setOpenTab, applyFilter }) => {
  const {
    root,
    row,
    btns,
    btn,
    calendar,
    selected,
    icon,
    filter,
    filterWrapper,
    hideOnSmall,
    iconSvg,
  } = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileView, setMobileView] = useState(false);

  // responsiveness
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 786
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  const handlePopperClick = () =>
    setAnchorEl(anchorEl ? null : document.getElementById('date-range'));

  const setToday = () => {
    setDate([
      {
        startDate: moment().startOf('day')._d,
        endDate: moment().endOf('day')._d,
        key: 'selection',
      },
    ]);
  };

  const setThisMonth = () => {
    setDate([
      {
        startDate: moment().startOf('month')._d,
        endDate: moment().endOf('month')._d,
        key: 'selection',
      },
    ]);
  };

  const calendarOpen = Boolean(anchorEl);
  const id = calendarOpen ? 'transitions-popper' : undefined;

  const button = (open, secondMethod, text, hideOnSm) => (
    <Typography
      variant="button"
      gutterBottom
      className={`${btn} ${hideOnSm && hideOnSmall} ${
        openTab === open ? selected : ''
      }`}
      onClick={() => {
        setOpenTab(`${open}`);
        secondMethod();
      }}
    >
      {text}
    </Typography>
  );

  return (
    <div className={root}>
      <Grid container>
        <div className={row}>
          <div className={btns}>
            {button('today', setToday, 'Today', false)}
            {button('thisMonth', setThisMonth, 'This Month', true)}
            {button('customized', handlePopperClick, 'customized', true)}
          </div>
          <span id="date-range" className={calendar}>
            <Typography
              variant="button"
              gutterBottom
              className={`${btn} ${icon}`}
              onClick={() => {
                setOpenTab('customized');
                handlePopperClick();
              }}
            >
              <DateRangeOutlined className={iconSvg} />
              <span>
                {moment(date[0].startDate).utc(true).format('YYYY/MM/DD')} -{' '}
                {moment(date[0].endDate).utc(true).format('YYYY/MM/DD')}
              </span>
            </Typography>

            {/* ---> Date Range start <--- */}
            <Popper
              id={id}
              open={calendarOpen}
              anchorEl={anchorEl}
              transition
              placement="left-start"
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <div style={{ display: 'grid' }}>
                    {mobileView ? (
                      <DateRange
                        onChange={(item) => setDate([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={date}
                        direction="horizontal"
                        showDateDisplay={true}
                      />
                    ) : (
                      <DateRangePicker
                        onChange={(item) => setDate([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={date}
                        direction="horizontal"
                        showDateDisplay={true}
                      />
                    )}
                    <div className={filterWrapper}>
                      <span>
                        <Typography
                          variant="button"
                          gutterBottom
                          className={filter}
                          onClick={() => {
                            setOpenTab('customized');
                            handlePopperClick();
                            applyFilter();
                          }}
                        >
                          APPLY FILTER
                        </Typography>
                      </span>
                    </div>
                  </div>
                </Fade>
              )}
            </Popper>
            {/* ---> Date Range end <--- */}
          </span>
        </div>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  report: state.report,
});

export default connect(mapStateToProps)(Options);
