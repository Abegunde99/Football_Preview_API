const { getArticles, postArticle, getArticleById, updateArticle, deleteArticle, getArticlesByTag, getArticlesByAuthor, getArticlesByFixture } = require('../controllers/articles-controller');
const router = require('express').Router();
const multer = require('../utils/multer');
const {protect} = require('../middlewares/auth')

router.get('/', getArticles);
router.post('/:fixtureId',protect, multer.single('image'), postArticle);
router.get('/:id', getArticleById);
router.put('/:id', protect, updateArticle);
router.delete('/:id',protect, deleteArticle);
router.get('/tag/:tag', getArticlesByTag);
router.get('/author/:author', getArticlesByAuthor);
router.get('/fixture/:fixtureId', getArticlesByFixture);

module.exports = router;