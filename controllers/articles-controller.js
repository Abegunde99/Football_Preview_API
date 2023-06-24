const { articlesService } = require('../services/articles-services');
const asyncHandler = require('../middlewares/async');
const cloudinary = require('../utils/cloudinary');

// @desc      Get all articles
// @route     GET /articles
const getArticles = asyncHandler(async (req, res, next) => { 
    const articles = await articlesService.getArticles();

    if (articles.length === 0) { 
        return res.status(404).json({ success: false, message: 'No articles found' });
    }
    res.status(200).json({ success: true, articles });
});


// @desc      create article
// @route     POST /articles
const postArticle = asyncHandler(async (req, res, next) => {
    //acess user from req.user
    const user = req.user;
    //post articles and also upload image to cloudinary and add fixtureid to article  
    const article = req.body;

    //check if file is uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const file = req.file;
    const upload = await cloudinary.v2.uploader.upload(file.path, { folder: 'upload' });

    article.image = upload.secure_url;
    article.fixture = req.params.fixtureId;
    article.author = `${user.firstName} ${user.lastName}`
    const newArticle = await articlesService.postArticle(article);
    res.status(200).json({ success: true, newArticle });
});


// @desc      Get article by id
// @route     GET /articles/:id
const getArticleById = asyncHandler(async (req, res, next) => {
    const article = await articlesService.getArticleById(req.params.id);

    if (article === null) { 
        return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.status(200).json({ success: true, article }); 
})


// @desc      Update article
// @route     PUT /articles/:id
const updateArticle = asyncHandler(async (req, res, next) => { 
    const article = req.body;

    //check if article exists
    const articleExists = await articlesService.getArticleById(req.params.id);
    if (articleExists === null) {
        return res.status(400).json({ success: false, message: 'Invalid article id' });
    }

    const newArticle = await articlesService.updateArticle(req.params.id, article);
    res.status(200).json({ success: true, newArticle }); 
});


// @desc      Delete article
// @route     DELETE /articles/:id
const deleteArticle = asyncHandler(async (req, res, next) => { 
    //check if article exists
    const articleExists = await articlesService.getArticleById(req.params.id);
    if (articleExists === null) {
        return res.status(400).json({ success: false, message: 'Invalid article id' });
    }

    const article = await articlesService.deleteArticle(req.params.id);
    res.status(200).json({ success: true, message: "article deleted successfully" }); 
});


// @desc      Get articles by tag
// @route     GET /articles/tag/:tag
const getArticlesByTag = asyncHandler(async (req, res, next) => {
    const articles = await articlesService.getArticlesByTag(req.params.tag);

    if (articles.length === 0) { 
        return res.status(404).json({ success: false, message: 'No article found' });
    }
    res.status(200).json({ success: true, articles }); 
});


// @desc      Get articles by author
// @route     GET /articles/author/:author
const getArticlesByAuthor = asyncHandler(async (req, res, next) => { 
    const articles = await articlesService.getArticlesByAuthor(req.params.author);

    if (articles.length === 0) {
        return res.status(404).json({ success: false, message: 'No article found' });
    }
    res.status(200).json({ success: true, articles });
});


// @desc      Get articles by fixture
// @route     GET /articles/fixture/:fixtureId
const getArticlesByFixture = asyncHandler(async (req, res, next) => { 
    const articles = await articlesService.getArticlesByFixture(req.params.fixtureId);

    if (articles.length === 0) { 
        return res.status(404).json({ success: false, message: 'No article found' });
    }
    res.status(200).json({ success: true, articles });
});


//@desc    Get articles by league
//@route   GET /articles/league
const getArticlesByLeague = asyncHandler(async (req, res, next) => { 
    const articles = await articlesService.getArticlesByLeague(req.params.league);

    if (articles.length === 0) { 
        return res.status(404).json({ success: false, message: 'No article found' });
    }
    res.status(200).json({ success: true, articles });
});

module.exports = { getArticles, postArticle, getArticleById, updateArticle, deleteArticle, getArticlesByTag, getArticlesByAuthor, getArticlesByFixture, getArticlesByLeague };