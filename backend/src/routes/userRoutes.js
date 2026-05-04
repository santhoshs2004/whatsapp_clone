const express = require('express');
const router = express.Router();
const {
  loginOrRegister,
  getAllUsers,
  getUserById,
  updateUser,
  logout
} = require('../controllers/userController');

router.post('/login', loginOrRegister);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.post('/logout/:id', logout);

module.exports = router;
