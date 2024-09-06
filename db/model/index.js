const { User, UserSchema } = require('./userModel');
const { Favoritos, FavoritosSchema } = require('./favoritoModel');
const { Movies, MovieSchema } = require('./movieModel');
const { FavoritoMovie, FavoritoMovieSchema } = require('./favoritosMovieModel');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Movies.init(MovieSchema, Movies.config(sequelize))
  Favoritos.init(FavoritosSchema, Favoritos.config(sequelize));
  FavoritoMovie.init(FavoritoMovieSchema,FavoritoMovie.config(sequelize))
  

  User.associate(sequelize.models)
  Movies.associate(sequelize.models)
  Favoritos.associate(sequelize.models)
}

module.exports = setupModels;