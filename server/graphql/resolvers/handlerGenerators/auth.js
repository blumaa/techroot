// resolvers/handlerGenerators/auth.js
import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require("dotenv").config();


export async function createUser(args) {
  try {
    const {
      email,
      password,
      confirm,
      nickname,
      role
    } = args.userInput; //retrieve values from arguments
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists!');
    }
    if (password !== confirm) {
      throw new Error('Passwords are inconsistent!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      nickname,
      role
    }, (err) => { if (err) throw err });
    user.save();
    // if user is registered without errors
    // create a token
    const token = jwt.sign({ id: user._id }, process.env.SECRET);

    return { token, password: null, ...user._doc }
  }
  catch(err) {
    throw err;
  }
}

export async function login(args) {
  try {
    const user = await User.findOne({ email: args.email });
    if (!user) throw new Error('Email does not exist');
    const passwordIsValid = await bcrypt.compareSync(args.password, user.password);
    if (!passwordIsValid) throw new Error('Password incorrect');
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    return { token, password: null, ...user._doc }
  }
  catch (err) {
    throw err;
  }
}

export async function verifyToken(args) {
  try {
    const decoded = jwt.verify(args.token, process.env.SECRET);
    const user = await User.findOne({ _id: decoded.id })
    return { ...user._doc, password: null };
  }
  catch (err) {
    throw err;
  }
}

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjc5ZmRlYWFjMjhkMzBmZDMwZmMyYyIsImlhdCI6MTU4Mzg1MDU1M30.nVQP3a9eklp7fRE3fIRbbe5d9X8YSzwsZGYANcXIfzw"
