const express = require('express');
const { signupUser, signinUser, updateUser, findFriends } = require('../controllers/userController');
const { tokenValidator } = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/signin', signinUser);
router.put('/', tokenValidator, updateUser);

router.get('/bulk', tokenValidator, findFriends);

module.exports = router;