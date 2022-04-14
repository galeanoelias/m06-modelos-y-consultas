const db = require('../database/models');
const sequelize = db.sequelize;

const genresController = {
    list: async (req, res) => {
        try {
            let genres = await db.Genre.findAll({
                include: [
                    {association: 'movies'}
                ]
            });
            res.render('genresList.ejs', {genres})
        } catch (error) {
            res.send(error.message)
        }
    },
    detail: async (req, res) => {
        try {
            let genre = await db.Genre.findByPk(req.params.id)
            res.render('genresDetail.ejs', {genre});
        } catch (error) {
            res.send(error.message)
        }
    }

}

module.exports = genresController;