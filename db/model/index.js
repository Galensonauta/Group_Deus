const { User, UserSchema } = require('./userModel');
const { Favoritos, FavoritoSchema } = require('./favoritoModel');
const { Movies, MovieSchema } = require('./movieModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Movies.init(MovieSchema, Movies.config(sequelize))
  Favoritos.init(FavoritoSchema, Favoritos.config(sequelize));
  User.associate(sequelize.models)
  Movies.associate(sequelize.models)
  Favoritos.associate(sequelize.models)
}

module.exports = setupModels;