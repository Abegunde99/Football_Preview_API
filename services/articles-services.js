const { articlesRepository } = require('../repository/articles-repository');
const { ErrorResponse } = require('../utils/errorResponse');

class articlesService {
    static async getArticles(page, limit) {
        try {
            const articles = await articlesRepository.getArticles(page, limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedArticles = articles.slice(startIndex, endIndex);
            return paginatedArticles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
    static async postArticle(article) {
        try {
            const newArticle = await articlesRepository.postArticle(article);
            return newArticle;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
    static async getArticleById(id) {
        try {
            const article = await articlesRepository.getArticleById(id);
            return article;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
    static async updateArticle(id, article) {
        try {
            const newArticle = await articlesRepository.updateArticle(id, article);
            return newArticle;
        }catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
    static async deleteArticle(id) {
        try {
            const article = await articlesRepository.deleteArticle(id);
            return article;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
    static async getArticlesByTag(tag, page, limit) {
        try {
            const articles = await articlesRepository.getArticlesByTag(tag);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedArticles = articles.slice(startIndex, endIndex);
            return paginatedArticles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
    static async getArticlesByAuthor(author, page, limit) {
        try {
            const articles = await articlesRepository.getArticlesByAuthor(author);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedArticles = articles.slice(startIndex, endIndex);
            return paginatedArticles;
        }catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getArticlesByFixture(fixturesId) { 
        try {
            const articles = await articlesRepository.getArticlesByFixture(fixturesId);
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getArticlesByLeague(league, page, limit) { 
        try {
            const articles = await articlesRepository.getArticlesByLeague(league);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedArticles = articles.slice(startIndex, endIndex);
            return paginatedArticles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getArticlesByBothTeam(team1, team2, page, limit) {
        try {
            const articles = await articlesRepository.getArticlesByBothTeam(team1, team2);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedArticles = articles.slice(startIndex, endIndex);
            return paginatedArticles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getArticlesByKeyword(keyword, page, limit) { 
        try {
            const articles = await articlesRepository.getArticlesByKeyword(keyword);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedArticles = articles.slice(startIndex, endIndex);
            return paginatedArticles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getArticlesByTopArticle(page, limit) { 
        try {
            const articles = await articlesRepository.getArticlesByTopArticle();
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedArticles = articles.slice(startIndex, endIndex);
            return paginatedArticles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async publishSavedArticle(id, article) { 
        try {
            const articles = await articlesRepository.publishSavedArticle(id);
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

}

module.exports = {articlesService};