const { Model, DataTypes, Sequelize } = require("sequelize")
const { USER_TABLE } = require('./userModel')


const LISTAS_TABLE = "listas"

const ListasSchema ={ 
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "Favoritos"
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
        onDelete: 'CASCADE'
      }, 
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.fn('NOW')
      }      
}
class Listas extends Model {
    static associate(models) {
      this.belongsTo(models.User,{ 
        foreignKey: 'userId',
        as:"userList"
      });
      this.belongsToMany(models.Movies,{
        as: "moviesList",
        through: models.ListaMovie,
        foreignKey: 'listId',
        otherKey: 'movieId'
      })
      this.belongsToMany(models.Tvs,{
        as: "tvsList",
        through: models.ListaTv,
        foreignKey: 'listId',
        otherKey: 'tvId'
      })
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: LISTAS_TABLE,
            modelName: 'Listas',
            timestamps: false
        }
    }
}
module.exports = { LISTAS_TABLE, ListasSchema, Listas }