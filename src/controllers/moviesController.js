const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const moviesController = {
    list: async (req, res) => {
        try {
            let movies = await db.Movie.findAll()
            res.render('moviesList.ejs', {movies})
        } catch (error) {
            res.send(error.message)
        }
    },
    detail: async (req, res) => {
        try {
            let movie = await db.Movie.findByPk(req.params.id);
            res.render('moviesDetail.ejs', {movie});
        } catch (error) {
            res.send(error.message)
        }
    },
    new: async (req, res) => {
        try {
            let movies = await db.Movie.findAll({
                order : [
                    ['release_date', 'DESC']
                ],
                limit: 5
            });
            res.render('newestMovies', {movies});
        } catch (error) {
            res.send(error.message)
        }
    },
    recomended: async (req, res) => {
        try {
            let movies = await db.Movie.findAll({
                where: {
                    rating: {[db.Sequelize.Op.gte] : 8}
                },
                order: [
                    ['rating', 'DESC']
                ]
            })
            res.render('recommendedMovies.ejs', {movies});
        } catch (error) {
            res.send(error.message)
        }
    },

}

module.exports = moviesController;