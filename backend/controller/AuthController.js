const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { jwtSecret } = require('../config/env');
const { validateEmail, validateMobile } = require('../utils/Validators');

const saltRounds = 10;

exports.register = async (req, res) => {
  try {
    const { name, mobile, gender, country, hobbies, email, password } = req.body;

    if (!validateEmail(email) || !validateMobile(mobile)) {
      return res.status(400).json({ error: 'Invalid email or mobile number' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ name, mobile, gender, country, hobbies, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid input' });
  }
};

exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ where: { mobile } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '12h'});
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
