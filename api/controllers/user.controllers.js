// importing required packages and modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing jwt Secret
const jwtSecret = require('../config/default.json').jwtSecret;

// importing required models
const User = require('../models/user.model');

// get a user
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// get a user by Id
const getUserById = async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId || req.user.admin) {
      const user = await User.findById(req.params.userId).select(
        '-password -__v'
      );

      res.status(200).json(user);
    } else {
      res.status(500).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ admin: false }).select('-password -__v');
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// create an employee
const addEmployee = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      admin,
      bio,
      salary,
      skills,
      image,
    } = req.body;

    const user = await User.findOne({ email }).select('name email _id');

    // if user with email provided by client already exists => return a response
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // if user with email provided by client doesn't already exists => proceed to add Employee
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    let userFields = {};
    userFields.name = name;
    userFields.email = email;
    userFields.password = encryptedPassword;
    userFields.admin = admin;
    if (bio) userFields.bio = bio;
    if (skills)
      userFields.skills = skills.split(',').map((skill) => skill.trim());
    if (salary) userFields.salary = salary;
    if (image) userFields.image = image;

    let newUser = new User(userFields);

    newUser = await newUser.save();
    res.status(201).json({
      message: 'Employee created',
      createdEmployee: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        bio: newUser.bio,
        salary: newUser.salary,
        skills: newUser.skills,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    let user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'user does not exist' });
    }

    const {
      name,
      email,
      password,
      admin,
      bio,
      skills,
      salary,
      image,
      linkedIn,
      github,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    let userFields = {};
    userFields.name = name;
    userFields.email = email;
    userFields.admin = admin;
    if (password) userFields.password = encryptedPassword;
    if (bio) userFields.bio = bio;
    if (skills) userFields.skills = skills;
    if (salary) userFields.salary = salary;
    if (image) userFields.image = image;

    // build social object
    userFields.social = {};
    if (linkedIn) userFields.social.linkedIn = linkedIn;
    if (github) userFields.social.github = github;

    let updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    );

    res.status(200).json({ message: 'user updated', user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  addEmployee,
  getUser,
  getUserById,
  updateUser,
  getUsers,
};
