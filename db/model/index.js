const { User, UserSchema } = require('./userModel');
const { Listas, ListasSchema } = require('./listaModel');
const { Movies, MovieSchema } = require('./movieModel');
const { Tvs, TvSchema } = require('./tvModel');
const { ListaMovie, ListaMovieSchema } = require('./listaMovieModel');
const { ListaTv, ListaTvSchema } = require('./listaTvModel');
const { UserMovie, UserMovieSchema } = require('./userMovieModel');
const { UserTv, UserTvSchema } = require('./userTvModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Listas.init(ListasSchema, Listas.config(sequelize));
  Movies.init(MovieSchema, Movies.config(sequelize))
  Tvs.init(TvSchema, Tvs.config(sequelize))
  ListaMovie.init(ListaMovieSchema,ListaMovie.config(sequelize))  
  ListaTv.init(ListaTvSchema,ListaTv.config(sequelize))  
  UserMovie.init(UserMovieSchema,UserMovie.config(sequelize))  
  UserTv.init(UserTvSchema,UserTv.config(sequelize))  

  User.associate(sequelize.models)
  Movies.associate(sequelize.models)
  Tvs.associate(sequelize.models)
  Listas.associate(sequelize.models)
  ListaMovie.associate(sequelize.models)
  ListaTv.associate(sequelize.models)
  UserMovie.associate(sequelize.models)
  UserTv.associate(sequelize.models)
}

module.exports = setupModels;