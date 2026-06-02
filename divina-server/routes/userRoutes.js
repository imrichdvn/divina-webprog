const express = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/userController');
const { verifyToken, verifyTokenOptional, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.route('/').get(verifyToken, authorizeRoles('admin'), getUsers).post(verifyTokenOptional, createUser);
router
  .route('/:id')
  .put(verifyToken, authorizeRoles('admin'), updateUser)
  .delete(verifyToken, authorizeRoles('admin'), deleteUser);

module.exports = router;
