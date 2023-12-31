const { articlesService } = require('../services/articles-services');
const asyncHandler = require('../middlewares/async');
const cloudinary = require('../utils/cloudinary');

// @desc      Get all articles
// @route     GET /articles
const getArticles = asyncHandler(async (req, res, next) => { 
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    if (req.query.team1 && req.query.team2) {
        const {articles, total} = await articlesService.getArticlesByBothTeam(req.query.team1, req.query.team2, page, limit);
        
        return res.status(200).json({ success: true, pagination: { page, limit, total }, articles });

    }
    const { articles, total } = await articlesService.getArticles(page, limit);
    
    res.status(200).json({ success: true, pagination: { page, limit, total }, articles });
});


// @desc      create article
// @route     POST /articles?save=true
const postArticle = asyncHandler(async (req, res, next) => {
    //check if an article has been posted for this fixture
    const articleExists = await articlesService.getArticlesByFixture(req.params.fixtureId);
    if (articleExists.length > 0) { 
        //check if article is draft
        if (articleExists[0].status === 'draft') {
            //update article
            const updatedArticle = await articlesService.updateArticle(articleExists[0]._id, req.body);
            return res.status(200).json({ success: true, updatedArticle });
        } else {
            return res.status(400).json({ success: false, message: 'Article already exists for this fixture' });
        }
    }
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

    //check is article is being saved or posted
    if (req.query.save === true || req.query.save === 'true') {
        article.status = 'draft';
    } else {
        article.status = 'published';
        article.publishedAt = Date.now();
    }

    const newArticle = await articlesService.postArticle(article);
    res.status(200).json({ success: true, newArticle });
});


// @desc      Get article by id
// @route     GET /articles/:id
const getArticleById = asyncHandler(async (req, res, next) => {
    const article = await articlesService.getArticleById(req.params.id);

    if (article === null) { 
        return res.status(200).json({ success: true, message: 'Article not found' });
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

    //check if file is uploaded and file is different from the one in the database
    if (req.file) {
        const file = req.file;
        const upload = await cloudinary.v2.uploader.upload(file.path, { folder: 'upload' });
        //check if file is different from the one in the database
        if (upload.secure_url !== articleExists.image) {
            article.image = upload.secure_url;
        }
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

    //delete image from cloudinary
    const imageId = articleExists.image.split('/').slice(-1)[0].split('.')[0];
    await cloudinary.v2.uploader.destroy(imageId);

    const article = await articlesService.deleteArticle(req.params.id);
    res.status(200).json({ success: true, message: "article deleted successfully" }); 
});


// @desc      Get articles by tag
// @route     GET /articles/tag/:tag
const getArticlesByTag = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const {articles, total} = await articlesService.getArticlesByTag(req.params.tag , page, limit);

    res.status(200).json({ success: true, pagination: { page, limit, total }, articles }); 
});


// @desc      Get articles by author
// @route     GET /articles/author/:author
const getArticlesByAuthor = asyncHandler(async (req, res, next) => { 
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const {articles, total } = await articlesService.getArticlesByAuthor(req.params.author, page, limit);

    if (articles.length === 0) {
        return res.status(404).json({ success: false, message: 'No article found' });
    }
    res.status(200).json({ success: true, pagination: { page, limit, total }, articles });
});


// @desc      Get articles by fixture and increase views if user is not logged in
// @route     GET /articles/fixture/:fixtureId
const getArticlesByFixture = asyncHandler(async (req, res, next) => { 
    const articles = await articlesService.getArticlesByFixture(req.params.fixtureId);
    if (articles.length === 0) { 
        return res.status(200).json({ success: true, message: 'Article not found' });
    }
    if (!req.user) { 
        //increase views
        articles[0].views += 1;
        await articles[0].save();
    }

    //check if article is saved or published
    if (articles[0].status === 'draft') {
        return res.status(200).json({ success: true, message: 'Article is saved', articles });
    } else if (articles[0].status === 'published') {
        return res.status(200).json({ success: true, message: 'Article is published', articles });
    }
});


//@desc    Get articles by league
//@route   GET /articles/league
const getArticlesByLeague = asyncHandler(async (req, res, next) => { 
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const {articles, total} = await articlesService.getArticlesByLeague(req.params.league, page, limit);

    if (articles.length === 0) { 
        return res.status(200).json({ success: true, message: 'Article not found' });
    }
    res.status(200).json({ success: true, pagination: { page, limit, total }, articles });
});


//@desc   Get articles by keyword
//@route  GET /search/articles/:keyword
const getArticlesByKeyword = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const {articles, total} = await articlesService.getArticlesByKeyword(req.params.keyword, page, limit);

    res.status(200).json({ success: true, pagination: { page, limit, total }, articles });
});


//@desc   Get top rated articles
//@route  GET /toprated/articles
const getTopRatedArticles = asyncHandler(async (req, res, next) => { 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const {articles, total} = await articlesService.getArticlesByTopArticle(page, limit);

    res.status(200).json({ success: true, pagination: { page, limit, total }, articles });
});


//@desc  publish article when article status is draft
//@route PUT /publish/articles/:id
const publishSavedArticle = asyncHandler(async (req, res, next) => { 
    const articles = await articlesService.getArticleById(req.params.id);
    if (articles === null) {
        return res.status(404).json({ success: false, message: 'Article not found' });
    }

    if (articles.status === 'published') {
        return res.status(400).json({ success: false, message: 'Article is already published' });
    }

    const publishedArticle = await articlesService.publishSavedArticle(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Article published successfully', publishedArticle });
});


module.exports = { getArticles, postArticle, getArticleById, updateArticle, deleteArticle, getArticlesByTag, getArticlesByAuthor, getArticlesByFixture, getArticlesByLeague, getArticlesByKeyword, getTopRatedArticles, publishSavedArticle };