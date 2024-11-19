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
        unique: true
    },
    role:{
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "citizen"
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
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
        this.hasMany(models.Listas, {
          as: 'userList',
          foreignKey: 'userId'
        });
        this.belongsToMany(models.Movies, {
            as: 'userMovie',
            through:  models.UserMovie,
            foreignKey: 'userId',
            otherKey: 'movieId'
          });
          this.belongsToMany(models.Tvs, {
            as: 'userTv',
            through:  models.UserTv,
            foreignKey: 'userId',
            otherKey: 'tvId'
          });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
            hooks: {
                afterCreate: async (user, options) => {
                    const { Listas } = sequelize.models;
                    // Crear una lista de películas favoritas por defecto al crear un usuario
                    await Listas.create({
                        name: 'Favoritos',   // Nombre de la lista por defecto
                        userId: user.id      // Asignar la lista al usuario recién creado
                    });
                }
            }
        }
    }
}
module.exports = { USER_TABLE, UserSchema, User }