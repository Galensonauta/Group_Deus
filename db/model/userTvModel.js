const { Model, DataTypes } = require("sequelize");

const USER_TV_TABLE = "user_tv";

const UserTvSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // nombre de la tabla User
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  tvId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: 'tv', // nombre de la tabla Movie
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

class UserTv extends Model {
  static associate() { }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TV_TABLE,
      modelName: 'UserTv',
      timestamps: false,
    };
  }
}

module.exports = { USER_TV_TABLE, UserTvSchema, UserTv };
