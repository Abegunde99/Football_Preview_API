const { ArticlesModel , FixturesModel} = require('../models');
const { ErrorResponse } = require('../utils/errorResponse');

const articlesRepository = {
    getArticles: async () => {
        try {
            const articles = await ArticlesModel.find({'status': 'published'}).sort({ createdAt: -1 });
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
    postArticle: async (article) => { 
        try {
            const newArticle = await ArticlesModel.create(article);
            return newArticle;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
    getArticleById: async (id) => {
        try {
            const article = await ArticlesModel.findById(id);
            return article;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
    updateArticle: async (id, article) => {
        try {
             //check if article exists
             const articles = await ArticlesModel.findById(id);
             if (!articles) {
                 throw new ErrorResponse('Invalid article id', 400);
            }
            
            const newArticle = await ArticlesModel.findByIdAndUpdate(id, article, { new: true });
            return newArticle;
        }catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
    deleteArticle: async (id) => {
        try {
            //check if article exists
            const articles = await ArticlesModel.findById(id);
            if (!articles) {
                throw new ErrorResponse('Invalid article id', 400);
            }

            const article = await ArticlesModel.findByIdAndDelete(id);
            return article;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
    getArticlesByTag: async (tag) => {
        try {
            const articles = await ArticlesModel.find({'status': 'published', tags: new RegExp(tag, 'i') }).sort({ createdAt: -1 });
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
    getArticlesByAuthor: async (author) => {
        try {
            const articles = await ArticlesModel.find({ 'status': 'published', author: new RegExp(author, 'i') });
            return articles;
        }catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
    getArticlesByFixture: async (fixturesId) => { 
        try {
            //check if fixturesId is valid
            const fixture = await FixturesModel.findOne({'fixture.id': fixturesId});
            if (!fixture) {
                throw new ErrorResponse('Invalid fixture id', 400);
            }

            const articles = await ArticlesModel.find({ fixture: fixturesId });
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
    getArticlesByLeague: async (league) => { 
        try {
            const articles = await ArticlesModel.find({ 'status': 'published', 'league': new RegExp(league, 'i') }).sort({createdAt: -1});
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }, 

   getArticlesByBothTeam: async (team1, team2) => { 
        try {
            const articles = await ArticlesModel.find({ $or: [{ 'tags': new RegExp(team1, 'i') }, { 'tags': new RegExp(team2, 'i') }], 'status': 'published' }).sort({createdAt: -1});
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
   },

    getArticlesByKeyword: async (keyword) => { 
        try {
            const articles = await ArticlesModel.find({ $or: [{ 'title': new RegExp(keyword, 'i') },{ 'body': new RegExp(keyword, 'i') }, { 'description': new RegExp(keyword, 'i') },{ 'tags': new RegExp(keyword, 'i') }], 'status': 'published' }).sort({createdAt: -1});
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    getArticlesByTopArticle: async () => { 
        try {
            const articles = await ArticlesModel.find({ 'status': 'published' ,'topArticle': true }).sort({createdAt: -1});
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    publishSavedArticle: async (id) => { 
        try {
            //check if article exists and status is draft
            const articles = await ArticlesModel.findById(id);

            //update article status to published    
            articles.status = 'published';
            articles.publishedAt = Date.now();

            await articles.save();

        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
};

module.exports = { articlesRepository };