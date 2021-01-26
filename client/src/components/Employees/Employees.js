// importing react stuff
import React, { Component } from 'react';
import { connect } from 'react-redux';

// importing required components
import Loading from '../Loading/Loading';
import NoData from '../NoData/NoData';

// importing required redux action
import { getUsers, setUsers, clearUser } from '../../redux/actions/user';

// importing material-ui stuff
import { Avatar, Grid, Typography, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: '1.554rem',
    color: '#666',
    fontWeight: '500',
    marginBottom: '35px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& svg': {
      fontSize: '1.5rem',
      color: '#666',
      margin: '-25px -35px 0 0',
      zIndex: 0,
    },
    '& input': {
      width: '70%',
      border: 'none',
      height: '35px',
      padding: '0 10px 0 40px',
      marginTop: '-28px',
      borderRadius: '5px',
      color: '#666',
      transition: '0.5s',
      backgroundColor: '#e4eaee',
      '&:hover': {
        backgroundColor: '#c6d2d9',
      },
      '&:focus': {
        backgroundColor: '#c6d2d9',
        width: '90%',
      },
    },
  },
  paper: {
    padding: '20px 30px',
    height: '100px',
    width: '130px',
  },
  container: {
    padding: '70px 0',
  },
  search: {
    width: '100%',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '25px',
    padding: '30px',
    boxSizing: 'border-box',
    border: '1px solid #c6d2d9',
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
    textAlign: 'center',
    color: '#333',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5',
    marginBottom: '1.4286rem',
  },
  wrapper: {
    padding: '20px 15px',
  },
};

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empty: false,
      employees: [],
    };
  }

  componentDidMount() {
    document.title = 'Employees | DeDev Technologies';
    this.props.getUsers();

    console.log(this.props.loggedInUser.admin);
  }

  componentDidUpdate(prevProps) {
    const { users } = this.props.user;
    if (users !== prevProps.user.users) {
      this.setState({
        ...this.state,
        employees: users,
        empty: users.length < 1 ? true : false,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  onChange = (queryText) => {
    const { users } = this.props.user;
    const query = queryText.toLowerCase().replace(' ', '_');
    let filteredUsers = users.filter((user) => user.name.includes(query));
    this.setState({
      ...this.state,
      employees: filteredUsers,
      empty: filteredUsers.length < 1 ? true : false,
    });
  };

  render() {
    const {
      loggedInUser,
      user: { users, loading },
      classes,
      className,
    } = this.props;

    return loading ? (
      <Loading />
    ) : (
      <Grid container className={clsx(classes.root, className)}>
        <Grid item xs={4} sm={5} md={6} lg={9} className={classes.heading}>
          <p>Team</p>
        </Grid>
        <Grid item xs={8} sm={7} md={6} lg={3} className={classes.inputWrapper}>
          <Search />
          <input
            label="Search Employees"
            placeholder="Search..."
            name="serach"
            onChange={(e) => this.onChange(e.target.value)}
          />
        </Grid>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {!this.state.empty ? (
            this.state.employees.map((user, idx) => (
              <Grid
                item
                style={{
                  width: '300px',
                  marginBottom: '35px',
                  padding: '10px',
                  backgroundColor: 'transparent',
                }}
                component={Paper}
                square
                elevation={24}
              >
                <Grid container>
                  <Grid item xs={12} className={classes.image}>
                    <Avatar className={classes.img}>
                      {user.name.split(' ')[0].charAt(0).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} className={classes.name}>
                    <Typography className={classes.nameText}>
                      {user.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.tagLine}>
                    <Typography variant="caption">{user.bio}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))
          ) : (
            <NoData text="No Matching results." />
          )}
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  loggedInUser: state.auth.user,
});

export default connect(mapStateToProps, { getUsers, setUsers, clearUser })(
  withStyles(styles)(Users)
);
