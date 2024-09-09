const { Model, DataTypes, Sequelize } = require("sequelize")
const { FAVORITOS_TABLE } = require('./favoritoModel')
const { MOVIE_TABLE } = require("./movieModel")


const FAVORITO_MOVIE_TABLE = "favorito_movie"

const FavoritoMovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  favId: {
    field: 'fav_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: FAVORITOS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  movieId: {
    field: 'movie_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MOVIE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  rank:{
    allowNull: true,
    type: DataTypes.INTEGER
  },
  commit:{
    allowNull: true,
    type: DataTypes.STRING
  },
  tag:{
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.fn('NOW')
  }
}
class FavoritoMovie extends Model {
  static associate() { }
  static config(sequelize) {
    return {
      sequelize,
      tableName: FAVORITO_MOVIE_TABLE,
      modelName: 'FavoritoMovie',
      timestamps: false
    }
  }
}
module.exports = { FAVORITO_MOVIE_TABLE, FavoritoMovieSchema, FavoritoMovie }