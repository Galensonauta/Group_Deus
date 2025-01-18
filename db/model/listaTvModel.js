const { Model, DataTypes, Sequelize } = require("sequelize")
const { LISTAS_TABLE } = require('./listaModel')
const { TV_TABLE } = require("./tvModel")


const LISTAS_TV_TABLE = "listas_tvs"

const ListaTvSchema = {
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
  tvId: {
    field: 'tv_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TV_TABLE,
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
class ListaTv extends Model {
  static associate() { }
  static config(sequelize) {
    return {
      sequelize,
      tableName: LISTAS_TV_TABLE,
      modelName: 'ListaTv',
      timestamps: false
    }
  }
}
module.exports = { LISTAS_TV_TABLE, ListaTvSchema, ListaTv }