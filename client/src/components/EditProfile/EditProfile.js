import React, { useState, useEffect } from 'react';
import Tags from '@yaireo/tagify/dist/react.tagify'; // React-wrapper file
import '@yaireo/tagify/dist/tagify.css';
import { PaperProfile } from '../Profile/Profile';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {
  Box,
  Grid,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
} from '@material-ui/core';

// importing utilities
import { validateOnBlur, validateOnSubmit } from '../../utilities/validation';

// apply custom styles to material-ui components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  h_3: {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  h_1_a: {
    fontSize: '2.52rem',
    fontWeight: 'bold',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, San Francisco, Helvetica Neue, Helvetica, Ubuntu, Roboto, Noto, Segoe UI, Arial, sans-serif',
    marginBottom: '7px',
  },
  paper: {
    padding: '20px 30px',
  },
  container: {
    padding: '70px 0',
  },
  input: {
    width: '100%',
  },
  btn: {
    padding: '0px 8px',
    display: 'grid',
    justifyItems: 'end',
  },
  social: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  skills: {
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

// React Arrow Function Component
const EditProfile = ({ auth: { user, loading }, updateUser, history }) => {
  // initialize classes
  const classes = useStyles();

  const [socialVisibility, setSocialVisibility] = useState(false);
  const [skills, setSkills] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    skills: '',
    salary: '',
    linkedIn: '',
    github: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    skills: '',
    salary: '',
    linkedIn: '',
    github: '',
  });

  useEffect(() => {
    document.title = 'Edit Profile | DeDev Technologies';
    setFormData({
      name: loading || !user.name ? '' : user.name.split('_').join(' '),
      email: loading || !user.email ? '' : user.email,
      password: loading || !user.password ? '' : '',
      bio: loading || !user.bio ? '' : user.bio,
      salary: loading || !user.salary ? '' : user.salary,
      linkedIn:
        loading || !user.social || !user.social.linkedIn
          ? ''
          : user.social.linkedIn,
      github:
        loading || !user.social || !user.social.github
          ? ''
          : user.social.github,
      admin: loading || !user.admin ? false : user.admin,
    });

    setSkills(loading || !user.skills ? [] : user.skills);
  }, [user]);

  // on change handler
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // on submit handler
  const onSubmit = async (e) => {
    const errorObj = validateOnSubmit(formData);

    if (errorObj.email || errorObj.password || errorObj.name) {
      setErrors({
        ...errors,
        name: errorObj.name ? errorObj.name : '',
        email: errorObj.email ? errorObj.email : '',
        password: errorObj.password ? errorObj.password : '',
      });
    } else {
      // if everything ok ? invoke the action
      formData.skills = skills;
      updateUser(formData, user._id, history);
    }
  };

  // on blur handler
  const onBlur = (e) => {
    validateOnBlur(e.target.name, formData, errors, setErrors);
  };

  // on focus handler
  const onFocus = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSkillDelete = (skillToDelete) => () => {
    // let newSkills = skills.filter((skill) => skill !== skillToDelete);
    setSkills((skills) => skills.filter((skill) => skill !== skillToDelete));
  };

  const onSkillSubmit = (e) => {
    e.preventDefault();
    const value = document.getElementById('skillChip').value.trim();
    setSkills([...skills, value]);
    e.target.reset();
  };

  return (
    <Box>
      {/* spacing={2} means 8 * 2 = 16px */}
      <Container spacing={2} maxWidth="md" className={classes.container}>
        {!loading && user.name && (
          <PaperProfile
            name={user.name}
            bio={user.bio ? user.bio : 'No bio'}
            skills={user.skills}
          />
        )}

        <Grid container xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.h_3} paragraph>
              Edit Profile
            </Typography>
            <Grid spacing={2} container xl={12}>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.input}
                  error={errors.name ? true : false}
                  label="Name"
                  value={formData.name}
                  helperText={errors.name && errors.name}
                  variant="filled"
                  name="name"
                  onChange={(e) => onChange(e)}
                  onBlur={(e) => onBlur(e)}
                  onFocus={(e) => onFocus(e)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.input}
                  error={errors.email ? true : false}
                  label="Email"
                  value={formData.email}
                  helperText={errors.email && errors.email}
                  variant="filled"
                  name="email"
                  onChange={(e) => onChange(e)}
                  onBlur={(e) => onBlur(e)}
                  onFocus={(e) => onFocus(e)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.input}
                  error={errors.password ? true : false}
                  label="Password"
                  type="Password"
                  value={formData.password}
                  helperText={errors.password && errors.password}
                  variant="filled"
                  name="password"
                  onChange={(e) => onChange(e)}
                  onBlur={(e) => onBlur(e)}
                  onFocus={(e) => onFocus(e)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.input}
                  error={errors.salary ? true : false}
                  label="Salary"
                  type="number"
                  value={formData.salary}
                  helperText={errors.salary && errors.salary}
                  variant="filled"
                  name="salary"
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  error={errors.bio ? true : false}
                  label="Bio"
                  value={formData.bio}
                  placeholder="e.g. creates beautiful Reactjs UIs"
                  helperText={errors.bio && errors.bio}
                  variant="filled"
                  name="bio"
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <form onSubmit={(e) => onSkillSubmit(e)}>
                  <TextField
                    className={classes.input}
                    // error={errors.skills ? true : false}
                    id="skillChip"
                    label="Skills"
                    type="text"
                    placeholder="add a skill and press Enter"
                    // helperText={errors.skills && errors.skills}
                    variant="filled"
                    name="ChipSkills"
                  />
                </form>
              </Grid>
              <Grid item xs={12}>
                <Paper component="ul" elevation={0} className={classes.skills}>
                  {skills.map((skill, idx) => (
                    <li key={idx}>
                      <Chip
                        label={skill}
                        onDelete={handleSkillDelete(skill)}
                        className={classes.chip}
                      />
                    </li>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="button"
                  display="block"
                  className={classes.social}
                  onClick={() => setSocialVisibility(!socialVisibility)}
                >
                  Add social accounts
                </Typography>
              </Grid>
              {socialVisibility && (
                <Grid item spacing={2} container>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.input}
                      error={errors.linkedIn ? true : false}
                      label="LinkedIn"
                      value={formData.linkedIn}
                      placeholder="e.g. https://www.linkedin.com/in/username"
                      helperText={errors.linkedIn && errors.linkedIn}
                      variant="filled"
                      name="linkedIn"
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.input}
                      error={errors.github ? true : false}
                      label="Github"
                      value={formData.github}
                      placeholder="e.g. https://github.com/username"
                      helperText={errors.github && errors.github}
                      variant="filled"
                      name="github"
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12} className={classes.btn}>
                <Button
                  variant="outlined"
                  // color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={(e) => onSubmit()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateUser })(
  withRouter(EditProfile)
);
