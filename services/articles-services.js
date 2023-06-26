const { articlesRepository } = require('../repository/articles-repository');
const { ErrorResponse } = require('../utils/errorResponse');

class articlesService {
    static async getArticles() {
        try {
            const articles = await articlesRepository.getArticles();
            return articles;
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
    static async getArticlesByTag(tag) {
        try {
            const articles = await articlesRepository.getArticlesByTag(tag);
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
    static async getArticlesByAuthor(author) {
        try {
            const articles = await articlesRepository.getArticlesByAuthor(author);
            return articles;
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

    static async getArticlesByLeague(league) { 
        try {
            const articles = await articlesRepository.getArticlesByLeague(league);
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getArticlesByBothTeam(team1, team2) {
        try {
            const articles = await articlesRepository.getArticlesByBothTeam(team1, team2);
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getArticlesByKeyword(keyword) { 
        try {
            const articles = await articlesRepository.getArticlesByKeyword(keyword);
            return articles;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
}

module.exports = {articlesService};