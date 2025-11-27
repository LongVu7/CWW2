const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authentication } = require('../../middleware/authentication');

// Public Routes (No Auth required)
router.route('/register')
  .post(authController.registerUser);

router.route('/login')
  .post(authController.loginUser);

router.route('/refresh-token')
  .post(authController.refresh);

router.route('/logout')
  .post(authController.logoutUser);

// Protected Profile Route (Specific auth just for this one)
router.route('/user')
  .get(authentication, authController.getUserProfile);

module.exports = router;

// module.exports = app => {
//   app
//     .route('/login')
//     .post(authController.login);

//   app
//     .route('/register')
//     .post(authController.register);

//   app
//     .route('/refresh-token')
//     .post(authController.refreshToken);
//   app
//     .route('/logout')
//     .post(authController.logout);
//   app
//     .route('/user')
//     .get(authMiddleware, authController.getUserProfile);
// };