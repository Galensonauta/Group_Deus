const { Model, DataTypes } = require("sequelize");

const MOVIE_TABLE = "movies"

const MovieSchema={
id: {  // Campo para guardar el ID de TMDb
    allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
title:{
    type: DataTypes.STRING,    
},
original_title:{   
    type: DataTypes.STRING,
   },
adult:{ 
    type: DataTypes.BOOLEAN
},
backdrop_path:{  
    type: DataTypes.STRING,
},
genre_ids:{  
    type: DataTypes.JSONB,
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
release_date:{ 
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
} ,
cast: {
    type: DataTypes.JSONB
},
crew:{
    type: DataTypes.JSONB
}
};
class Movies extends Model {
    static associate(models) {
        console.log('Associating Movies with UserMovie');  // Añade este console para depuración
        this.belongsToMany(models.User, {
            as: 'userMovie',
            through:  models.UserMovie,
            foreignKey: 'movieId',
            otherKey: 'userId'
          });
        this.belongsToMany(models.Listas, {
            as: 'list',
            through:  models.ListaMovie,
            foreignKey: 'movieId',
            otherKey: 'listId'
          });
    }
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
  
