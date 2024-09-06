const { Model, DataTypes } = require("sequelize");

const MOVIE_TABLE = "movies"

const MovieSchema={
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
},
title:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
},
originalTitle:{
    allowNull: false,
    type: DataTypes.STRING,
    field: "original_title",
    unique: true
},
overview: {
  allowNull: true,
  type: DataTypes.TEXT,
},
  genreIds:{
    allowNull: true,
    type: DataTypes.STRING,
    field: "genre_ids"
  },
  popularity: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  releaseDate: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "release_data"
  },
};

class Movies extends Model {
    static associate() {}
        static config(sequelize) {
            return {
                sequelize,
                tableName: MOVIE_TABLE,
                modelName: 'Movies',
                timestamps: false
            }
        }
    }
    module.exports = { MOVIE_TABLE, MovieSchema, Movies }
