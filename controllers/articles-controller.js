const { articlesService } = require('../services/articles-services');
const asyncHandler = require('../middlewares/async');
const cloudinary = require('../utils/cloudinary');

// @desc      Get all articles
// @route     GET /articles
const getArticles = asyncHandler(async (req, res, next) => { 
    const articles = await articlesService.getArticles();
    res.status(200).json({ success: true, articles });
});


// @desc      create article
// @route     POST /articles
const postArticle = asyncHandler(async (req, res, next) => {
    //post articles and also upload image to cloudinary and add fixtureid to article  
    const article = req.body;
    console.log(req.file)
    //check if file is uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const file = req.file;
    const upload = await cloudinary.v2.uploader.upload(file.path, { folder: 'upload' });
    article.image = upload.secure_url;
    article.fixture = req.params.id;
    const newArticle = await articlesService.postArticle(article);
    res.status(200).json({ success: true, newArticle });
});


// @desc      Get article by id
// @route     GET /articles/:id
const getArticleById = asyncHandler(async (req, res, next) => {
    const article = await articlesService.getArticleById(req.params.id);
    res.status(200).json({ success: true, article }); 
})


// @desc      Update article
// @route     PUT /articles/:id
const updateArticle = asyncHandler(async (req, res, next) => { 
    const article = req.body;
    const newArticle = await articlesService.updateArticle(req.params.id, article);
    res.status(200).json({ success: true, newArticle }); 
});


// @desc      Delete article
// @route     DELETE /articles/:id
const deleteArticle = asyncHandler(async (req, res, next) => { 
    const article = await articlesService.deleteArticle(req.params.id);
    res.status(200).json({ success: true, article }); 
});


// @desc      Get articles by tag
// @route     GET /articles/tag/:tag
const getArticlesByTag = asyncHandler(async (req, res, next) => {
    const articles = await articlesService.getArticlesByTag(req.params.tag);
    res.status(200).json({ success: true, articles }); 
});


// @desc      Get articles by author
// @route     GET /articles/author/:author
const getArticlesByAuthor = asyncHandler(async (req, res, next) => { 
    const articles = await articlesService.getArticlesByAuthor(req.params.author);
    res.status(200).json({ success: true, articles });
});


// @desc      Get articles by fixture
// @route     GET /articles/fixture/:fixtureId
const getArticlesByFixture = asyncHandler(async (req, res, next) => { 
    const articles = await articlesService.getArticlesByFixture(req.params.fixtureId);
    res.status(200).json({ success: true, articles });
});

module.exports = { getArticles, postArticle, getArticleById, updateArticle, deleteArticle, getArticlesByTag, getArticlesByAuthor, getArticlesByFixture };