const { Router } = require("express");
const router = Router();
const {
  signUpUser,
  signInUser,
  getUser,
  makeUserAdmin
} = require('../controllers/userControllers');
const userMiddleware  = require('../middleware/userMiddleware');

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.route('/me').get(userMiddleware, getUser);
router.route('/admin').post(userMiddleware, makeUserAdmin);

module.exports = router;