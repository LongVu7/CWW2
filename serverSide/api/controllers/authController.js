const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
  try {
    const { username, email, password, passwordConfirm ,firstName, lastName } = req.body;

    if (!username || !email || !password || !passwordConfirm || !firstName || !lastName ) {
      return res.status(400).send({ error: 'Cannot be blank in any fields' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).send({ error: 'The password and the confirmation password do not match' });
    }
    
    const existUser = await User.exists({email}).exec();
    if (existUser) {
      return  res.status(400).send({ error: 'Email already in use' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
          username,
          email,
          password: hashedPassword,
          firstName,
          lastName
        });
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
  
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;{
      if (!email || !password) {
        return res.status(400).send({ error: 'Please enter your email and password' });
      }

      const user = await User.findOne({ email }).exec();
      if (!user) {
        return res.status(400).send({ error: 'Your email or password is incorrect' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ error: 'Your email or password is incorrect' });
      }

      const accessToken = jwt.sign(
        {
          id: user.id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '30m'
        }
      )

      const refreshToken = jwt.sign(
        {
          id: user.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '1d'
        }
      )

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie('refresh_token', refreshToken, {httpOnly: true, sameSite: 'None', secure: false, maxAge: 24*60*60*1000})
      res.json({access_token: accessToken})
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
}

async function logoutUser(req, res) {
  const cookies = req.cookies;
  if (!cookies?.refresh_token) {
    return res.sendStatus(204);
  }

  const refreshToken = cookies.refresh_token;

  const user = await User.findOne({ refresh_token: refreshToken }).exec();

  if (!user) {
    res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true});
    return res.sendStatus(204);
  }

  user.refreshToken = null;
  await user.save();

  res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true});
  res.sendStatus(204);
}


async function refresh(req, res) {
  const cookies = req.cookies;

  if (!cookies.refresh_token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const refreshToken = cookies.refresh_token;
  const user = await User.findOne({ refresh_token: refreshToken }).exec();

  if (!user) {
    return res.status(403).send({ error: 'Forbidden' });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || user.id !== decoded.id) {
        return res.status(403).send({ error: 'Forbidden' });
      }

      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
      )
      res.json({ access_token: accessToken });

    }
  );
}


async function getUserProfile(req,res) {
  const user = req.user;
  res.status(200).json(user);
  
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refresh,
  getUserProfile
};