const { Model, DataTypes, Sequelize } = require("sequelize")
const { USER_TABLE } = require('./userModel')
const { MOVIE_TABLE} = require ("./movieModel")


const FAVORITO_TABLE = "favoritos"

const FavoritoSchema ={
createdAt: {
  allowNull: false,
  type: DataTypes.DATE,
  field: 'create_at',
  defaultValue: Sequelize.fn('NOW')
},
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        references: {
          model: USER_TABLE,
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
}
class Favoritos extends Model {
    static associate(models) {    
      this.belongsTo(models.User,{
        as: "user",
        foreignKey: "userId"
       });
       this.belongsTo(models.Movies,{
        as: "movies",
        foreignKey: "movieId"
       })        
     }
    static config(sequelize) {
        return {
            sequelize,
            tableName: FAVORITO_TABLE,
            modelName: 'Favoritos',
            timestamps: false
        }
    }
}
module.exports = { FAVORITO_TABLE, FavoritoSchema, Favoritos }