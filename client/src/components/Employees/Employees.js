import React, { Component, useEffect, useState } from 'react';
import { Container, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PaperProfile from '../Profile/PaperProfile';
import Loading from '../Loading/Loading';
import { connect } from 'react-redux';
import { getUsers, setUsers } from '../../redux/actions/user';
import clsx from 'clsx';

const styles = {
  root: {
    flexGrow: 1,
    padding: '40px 0',
  },
  input: {
    width: '100%',
    marginBottom: '20px',
  },
  paper: {
    padding: '20px 30px',
  },
  container: {
    padding: '70px 0',
  },
  search: {
    width: '100%',
  },
  card: {
    width: '100%',
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
      <Container maxWidth="md" className={clsx(classes.root, className)}>
        <Grid container className={clsx(classes.input, className)}>
          <Grid item xs={12}>
            <TextField
              className={clsx(classes.input, className)}
              label="Search Employees"
              placeholder="e.g. search employees by name"
              variant="filled"
              name="serach"
              onChange={(e) => this.onChange(e.target.value)}
            />
          </Grid>
        </Grid>
        {!this.state.empty
          ? this.state.employees.map((user, idx) => (
              <PaperProfile
                key={idx}
                name={user.name}
                bio={user.bio}
                skills={user.skills}
                userId={user._id}
                showEditBtn={
                  loggedInUser.admin || user._id === loggedInUser._id
                    ? true
                    : false
                }
              />
            ))
          : 'No matching results'}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  loggedInUser: state.auth.user,
});

export default connect(mapStateToProps, { getUsers, setUsers })(
  withStyles(styles)(Users)
);
