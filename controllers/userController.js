// userController.js
const { request } = require('express');
const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('reservations.restaurant');
    res.json(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('reservations.restaurant');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log("=========="+req);
    const { id } = req.params;
    console.log(id);
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
};


//favoutite section
exports.addToFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const restaurantId = req.params.restaurantId;

    // Add the restaurant to the user's favorites
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { fav: restaurantId } }, { new: true });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const restaurantId = req.params.restaurantId;

    // Remove the restaurant from the user's favorites
    const user = await User.findByIdAndUpdate(userId, { $pull: { fav: restaurantId } }, { new: true });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};