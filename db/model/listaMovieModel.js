const { Model, DataTypes, Sequelize } = require("sequelize")
const { LISTAS_TABLE } = require('./listaModel')
const { MOVIE_TABLE } = require("./movieModel")


const LISTAS_MOVIE_TABLE = "listas_movies"

const ListaMovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
   listId: {
    field: 'list_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: LISTAS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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
    onDelete: 'CASCADE',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.fn('NOW')
  }
}
class ListaMovie extends Model {
  static associate() { }
  static config(sequelize) {
    return {
      sequelize,
      tableName: LISTAS_MOVIE_TABLE,
      modelName: 'ListaMovie',
      timestamps: false
    }
  }
}
module.exports = { LISTAS_MOVIE_TABLE, ListaMovieSchema, ListaMovie }