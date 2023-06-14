const { getArticles, postArticle, getArticleById, updateArticle, deleteArticle, getArticlesByTag, getArticlesByAuthor, getArticlesByFixture } = require('../controllers/articles-controller');
const router = require('express').Router();


router.get('/', getArticles);
router.post('/:fixtureId',  postArticle);
router.get('/:id', getArticleById);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);
router.get('/tag/:tag', getArticlesByTag);
router.get('/author/:author', getArticlesByAuthor);
router.get('/fixture/:fixtureId', getArticlesByFixture);

module.exports = router;