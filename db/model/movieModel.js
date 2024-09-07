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
overview: {
  allowNull: true,
  type: DataTypes.TEXT,
}
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
