const { Model, DataTypes } = require("sequelize");

const USER_MOVIE_TABLE = "user_movie";

const UserMovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: 'users', // nombre de la tabla User
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  movieId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'movies', // nombre de la tabla Movie
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  comment: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  rank: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  tag: {
    allowNull: true,
    type: DataTypes.STRING,
  }
};

class UserMovie extends Model {
  static associate() { }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_MOVIE_TABLE,
      modelName: 'UserMovie',
      timestamps: false,
    };
  }
}

module.exports = { USER_MOVIE_TABLE, UserMovieSchema, UserMovie };
