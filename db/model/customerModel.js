const { Model, DataTypes, Sequelize } = require("sequelize")
const { USER_TABLE } = require('./userModel')

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name:{
        allowNull: false,
        type: DataTypes.STRING
    },
    lastName:{
        allowNull: false,
        type: DataTypes.STRING,
        field: "last_name"
    },
      phone:{
        allowNull: true,
        type: DataTypes.STRING,
      },    
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
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      } 
}
class Customer extends Model {
    static associate(models) {
       this.belongsTo(models.User,{
        as: "user"
       })
     }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false
        }
    }
}
module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer }