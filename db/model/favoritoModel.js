const { Model, DataTypes, Sequelize } = require("sequelize")
const { USER_TABLE } = require('./userModel')


const FAVORITOS_TABLE = "favoritos"

const FavoritosSchema ={ 
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }, 
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.fn('NOW')
      }      
}
class Favoritos extends Model {
    static associate(models) {
      this.belongsTo(models.User,{
        as:"user"});
      this.belongsToMany(models.Movies,{
        as: "mov",
        through: models.FavoritoMovie,
        foreignKey: 'favId',
        otherKey: 'movieId'
      })
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: FAVORITOS_TABLE,
            modelName: 'Favoritos',
            timestamps: false
        }
    }
}
module.exports = { FAVORITOS_TABLE, FavoritosSchema, Favoritos }