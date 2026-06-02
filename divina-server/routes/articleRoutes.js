const express = require('express');
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getArticles)
  .post(verifyToken, authorizeRoles('admin', 'editor'), createArticle);
router
  .route('/:id')
  .put(verifyToken, authorizeRoles('admin', 'editor'), updateArticle)
  .delete(verifyToken, authorizeRoles('admin', 'editor'), deleteArticle);

module.exports = router;
