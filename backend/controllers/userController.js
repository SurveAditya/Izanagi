import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/Usermodel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    //when we make a form in the frontend and when we submit it
    //we are going to send req and send data into body
    // and we receive the data sent from the body
    //in order to do this you need to write app.use(json) into your server
  const { email, password } = req.body;
  // res.send({email,password});

  const user = await User.findOne({ email })

  //here we are returning everthing that we found of the user
  //test this in postman if the user is valid or not
  //like if we have a user who enters correct name and password
  //then only he will ge the data
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token:  generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  //remeber in middleware we saved req.user that is what we are accesing here
  const user = await User.findById(req.user._id)

  if (user) {
    //so this will be returned for the logged in user
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
//PUT request is made to a particular resource. If the Request-URI refers to an already existing resource, an update operation will happen, 
//otherwise create operation should happen if Request-URI is a valid resource URI. 
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //also we have defined a usermodel
  //to encrypt the password when it is saved in the database
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export { authUser,getUserProfile,registerUser,updateUserProfile };