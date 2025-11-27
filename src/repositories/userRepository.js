// src/repositories/userRepository.js
const User = require('../models/User');

const save = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};

const updateVerification = async (id) => {
  return await User.findByIdAndUpdate(id, { isVerified: true }, { new: true });
};

module.exports = { save, findByEmail, findById, updateVerification };