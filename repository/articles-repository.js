const { ArticlesModel , FixturesModel} = require('../models');
const { ErrorResponse } = require('../utils/errorResponse');

const articlesRepository = {
    getArticles: async () => {
        try {
            const articles = await ArticlesModel.find({});
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
            const articles = await ArticlesModel.find({ tags: new RegExp(tag, 'i') });
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
    getArticlesByAuthor: async (author) => {
        try {
            const articles = await ArticlesModel.find({ author: new RegExp(author, 'i') });
            return articles;
        }catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },
    getArticlesByFixture: async (fixturesId) => { 
        try {
            console.log(fixturesId)
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
            const articles = await ArticlesModel.find({ 'league': new RegExp(league, 'i') });
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }  

};

module.exports = { articlesRepository };