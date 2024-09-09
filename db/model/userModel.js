const { Model, DataTypes, Sequelize } = require("sequelize")

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nick:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    }, 
    role:{
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "Comunero"
    },      
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.fn('NOW')
     } 
}
class User extends Model {
    static associate(models) {
        this.hasMany(models.Favoritos, {
          as: 'favoritos',
          foreignKey: 'userId'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}
module.exports = { USER_TABLE, UserSchema, User }