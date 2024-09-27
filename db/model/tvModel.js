const { Model, DataTypes } = require("sequelize");

const TV_TABLE = "tv"

const TvSchema={
id: {  // Campo para guardar el ID de TMDb
    allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
name:{
    type: DataTypes.STRING,    
},
   original_name:{
    type: DataTypes.STRING,
   },
adult:{
 
    type: DataTypes.BOOLEAN
},
backdrop_path:{ 
 
    type: DataTypes.STRING,
},
genre_ids:{ 
 
    type: DataTypes.JSONB
},
media_type:{ 
 
    type: DataTypes.STRING
},
original_language:{ 
 
    type: DataTypes.STRING
},
overview: {
 
    type: DataTypes.TEXT
},
popularity:{ 
 
    type: DataTypes.FLOAT
},
poster_path: {
 
    type: DataTypes.STRING
},
first_air_date:{
    type: DataTypes.STRING
},
video:{ 
    type: DataTypes.BOOLEAN
},
vote_average:{ 
    type: DataTypes.FLOAT
},
vote_count:{ 
    type: DataTypes.FLOAT
},
cast: {
    type: DataTypes.JSONB
},
crew:{
    type: DataTypes.JSONB
} 
};
class Tvs extends Model {
    static associate(models) {
        this.belongsToMany(models.User, {
            as: 'userTv',
            through:  models.UserTv,
            foreignKey: 'tvId',
            otherKey: 'userId'
          });
        this.belongsToMany(models.Listas, {
            as: 'list',
            through:  models.ListaTv,
            foreignKey: 'tvId',
            otherKey: 'listId'
          });
    }
        static config(sequelize) {
            return {
                sequelize,
                tableName: TV_TABLE,
                modelName: 'Tvs',
                timestamps: false
            }
        }
    }
    module.exports = { TV_TABLE, TvSchema, Tvs }
  
