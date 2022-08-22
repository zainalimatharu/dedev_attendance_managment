import React, { useState, useEffect } from "react";
import Profile from "../Profile/Profile";
import Loading from "../Loading/Loading";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Save, EditOutlined } from "@material-ui/icons";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
} from "@material-ui/core";

// importing required redux actions
import { updateUser, getUserById, clearUser } from "../../redux/actions/user";
import { setOpenPage } from "../../redux/actions/navigation";

// importing utilities
import { validateOnBlur, validateOnSubmit } from "../../utilities/validation";

// apply custom styles to material-ui components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: "25px",
    border: "1px solid #c6d2d9",
  },
  h_3: {
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  h_1_a: {
    fontSize: "2.52rem",
    fontWeight: "bold",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, San Francisco, Helvetica Neue, Helvetica, Ubuntu, Roboto, Noto, Segoe UI, Arial, sans-serif",
    marginBottom: "7px",
  },
  paper: {
    padding: "20px 30px",
  },
  formContainer: {
    padding: "16px",
  },
  heading: {
    backgroundColor: "#e4eaee",
    padding: "9px 16px",
    fontSize: "1.3rem",
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "500",
    margin: "0 0 25px 0",
    borderBottom: "1px solid #c6d2d9",
  },
  input: {
    width: "100%",
  },
  btn: {
    padding: "0px 8px",
    display: "grid",
    justifyItems: "end",
  },
  btnClicked: {
    opacity: "0.5",
    cursor: "not-allowed",
  },
  social: {
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  skills: {
    display: "flex",
    // justifyContent: 'center',
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

// React Arrow Function Component
const EditProfile = ({
  // auth: { user, loading },
  employee: { user, loading },
  clearUser,
  history,
  match,
  updateUser,
  getUserById,
  setOpenPage,
}) => {
  // initialize classes
  const classes = useStyles();

  const [socialVisibility, setSocialVisibility] = useState(false);
  const [skills, setSkills] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: "",
    linkedIn: "",
    github: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    bio: "",
    skills: "",
    linkedIn: "",
    github: "",
  });

  const [updating, setUpdating] = useState(false);

  // useEffect hook to set navigation openTab & document title
  useEffect(() => {
    document.title = "Edit Profile | DeDev Technologies";
    setOpenPage("profile");
  }, []);

  useEffect(() => {
    getUserById(match.params.userId);

    return function cleanUp() {
      clearUser();
    };
  }, [getUserById]);

  useEffect(() => {
    setFormData({
      name: loading || !user.name ? "" : user.name.split("_").join(" "),
      email: loading || !user.email ? "" : user.email,
      bio: loading || !user.bio ? "" : user.bio,
      linkedIn:
        loading || !user.social || !user.social.linkedIn
          ? ""
          : user.social.linkedIn,
      github:
        loading || !user.social || !user.social.github
          ? ""
          : user.social.github,
      admin: loading || !user.admin ? false : user.admin,
    });

    setSkills(loading || !user.skills ? [] : user.skills);

    setUpdating(false); // set update loading false
    window.scrollTo(0, 0); // scroll to top when update completed
  }, [user]);

  // on change handler
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // on submit handler
  const onSubmit = async (e) => {
    const errorObj = validateOnSubmit(formData);

    if (errorObj.email || errorObj.name) {
      setErrors({
        ...errors,
        name: errorObj.name ? errorObj.name : "",
        email: errorObj.email ? errorObj.email : "",
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
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSkillDelete = (skillToDelete) => () => {
    setSkills((skills) => skills.filter((skill) => skill !== skillToDelete));
  };

  const onSkillSubmit = (e) => {
    e.preventDefault();
    const value = document.getElementById("skillChip").value.trim();
    value.length > 0 && setSkills([...skills, value]);
    e.target.reset();
  };

  return loading ? (
    <Loading />
  ) : (
    <Grid container className={classes.root} variant="outlined">
      {!loading && user.name && (
        <Profile
          name={user.name}
          bio={user.bio ? user.bio : "No bio"}
          skills={user.skills}
          showEditBtn={false}
          hasPad={true}
        />
      )}

      <Grid
        container
        component={Paper}
        elevation={0}
        square
        className={classes.container}
      >
        <Grid item xs={12} container spacing={2} className={classes.heading}>
          <Grid item>
            <EditOutlined />
          </Grid>
          <Grid item xs>
            <p>Edit Profile</p>
          </Grid>
        </Grid>
        <Grid spacing={2} container xs={12} className={classes.formContainer}>
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.input}
              error={errors.name ? true : false}
              label="Name"
              value={formData.name}
              helperText={errors.name}
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
              name="email"
              onChange={(e) => onChange(e)}
              onBlur={(e) => onBlur(e)}
              onFocus={(e) => onFocus(e)}
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
                  name="github"
                  onChange={(e) => onChange(e)}
                />
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} className={classes.btn}>
            {!updating ? (
              <Button
                variant="outlined"
                size="large"
                startIcon={<Save />}
                onClick={() => {
                  onSubmit();
                  setUpdating(true);
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="large"
                className={classes.btnClicked}
              >
                Updating...
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  employee: state.user,
});

export default connect(mapStateToProps, {
  updateUser,
  getUserById,
  clearUser,
  setOpenPage,
})(withRouter(EditProfile));
