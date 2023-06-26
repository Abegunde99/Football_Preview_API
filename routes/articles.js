const { getArticles, postArticle, getArticleById, updateArticle, deleteArticle, getArticlesByTag, getArticlesByAuthor, getArticlesByFixture, getArticlesByLeague, getArticlesByKeyword } = require('../controllers/articles-controller');
const router = require('express').Router();
const multer = require('../utils/multer');
const {protect} = require('../middlewares/auth')

router.get('/articles', getArticles);
router.post('/articles/:fixtureId',protect, multer.single('image'), postArticle);
router.get('/articles/:id', getArticleById);
router.put('/articles/:id', protect, multer.none(), updateArticle);
router.delete('/articles/:id',protect, deleteArticle);
router.get('/articles/tag/:tag', getArticlesByTag);
router.get('/articles/author/:author', getArticlesByAuthor);
router.get('/articles/fixture/:fixtureId', getArticlesByFixture);
router.get('/article/:league', getArticlesByLeague);
router.get('/search/articles/:keyword', getArticlesByKeyword);



module.exports = router;