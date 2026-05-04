const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Login or Register
exports.loginOrRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password are required' });
    }

    // Try to find existing user by email
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      user.isOnline = true;
      user.lastSeen = new Date();
      await user.save();
      return res.status(200).json({ success: true, user });
    }

    // Check if username is taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = await User.create({ 
      username, 
      email: email.toLowerCase(), 
      password: hashedPassword 
    });
    user.isOnline = true;
    await user.save();

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('SERVER ERROR IN loginOrRegister:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: `Server Crash: ${error.message}` });
  }
};

// Get all users (excluding optional user)
exports.getAllUsers = async (req, res) => {
  try {
    const { excludeUserId } = req.query;
    const filter = excludeUserId ? { _id: { $ne: excludeUserId } } : {};
    const users = await User.find(filter).select('-__v').sort({ username: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { username, bio, avatarColor, profilePic, instagram, facebook } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, bio, avatarColor, profilePic, instagram, facebook },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isOnline: false, lastSeen: new Date() },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
