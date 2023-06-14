const { articlesService } = require('../services/articles-services');
const cloudinary = require('../utils/cloudinary');

const getArticles = async (req, res, next) => { 
    try {
        const articles = await articlesService.getArticles();
        res.status(200).json({ success: true, articles });
    } catch (error) {
        next(error);
    }
};

const postArticle = async (req, res, next) => {
    //post articles and also upload image to cloudinary and add fixtureid to article
    try {
        const article = req.body;

        //check if file is uploaded
        if (!req.files) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const { file } = req.files;
        const upload = await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'upload' });
        article.image = upload.secure_url;
        article.fixture = req.params.id;
        const newArticle = await articlesService.postArticle(article);
        res.status(200).json({ success: true, newArticle });
    } catch (error) {
        next(error);
    }
    
};


const getArticleById = async (req, res, next) => {
    try {
        const article = await articlesService.getArticleById(req.params.id);
        res.status(200).json({ success: true, article });
    } catch (error) {
        next(error);
    }
}

const updateArticle = async (req, res, next) => { 
    try {
        const article = req.body;
        const newArticle = await articlesService.updateArticle(req.params.id, article);
        res.status(200).json({ success: true, newArticle });
    }catch (error) {
        next(error);
    }
};

const deleteArticle = async (req, res, next) => { 
    try {
        const article = await articlesService.deleteArticle(req.params.id);
        res.status(200).json({ success: true, article });
    } catch (error) {
        next(error);
    }
};

const getArticlesByTag = async (req, res, next) => {
    try {
        const articles = await articlesService.getArticlesByTag(req.params.tag);
        res.status(200).json({ success: true, articles });
    } catch (error) {
        next(error);
    }
};

const getArticlesByAuthor = async (req, res, next) => { 
    try {
        const articles = await articlesService.getArticlesByAuthor(req.params.author);
        res.status(200).json({ success: true, articles });
    }catch (error) {
        next(error);
    }
};

const getArticlesByFixture = async (req, res, next) => { 
    try {
        const articles = await articlesService.getArticlesByFixture(req.params.fixtureId);
        res.status(200).json({ success: true, articles });
    }catch (error) {
        next(error);
    }
};

module.exports = { getArticles, postArticle, getArticleById, updateArticle, deleteArticle, getArticlesByTag, getArticlesByAuthor, getArticlesByFixture };