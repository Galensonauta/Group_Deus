const boom = require('@hapi/boom');
const {models} = require("./../libs/sequelize");
const bcrypt = require("bcrypt")
const sequelize = require('./../libs/sequelize.js');

const {UserMovie} = require('../db/model/userMovieModel.js');
const {Movies}= require("../db/model/movieModel.js")

const MoviesService = require('../services/movieService.js');
const serviceMovie = new MoviesService();
class UserService {
  constructor() {}
  async find() {
    const options ={
       include: [    
        {
          association: "userList",
          include: [
            {
              association: "moviesList",   // Lista de películas
              attributes: ["title"],       // Solo obtener el título de las películas
            },
            {
              association: "tvsList",      // Lista de series
              attributes: ["name"],        // Solo obtener el nombre de las series
            }
          ],
        },               
        {
        association: "userMovie",
        attributes:["title"]
      },
      {
      association: "userTv",
        attributes:["name"]}
      ]
    }
    const res = await models.User.findAll(options)
    return res
  }  
  async findOne(id) {
    const user = await models.User.findByPk(id,{          
          include: [    
            {
              association: "userList",
              include: [
                {
                  association: "moviesList",   // Lista de películas                 
                },
                {
                  association: "tvsList",      // Lista de series                 
                }
              ],
            },               
            {
            association: "userMovie",          
          },
          {
          association: "userTv",
        }
          ]
       })     
    if(!user){
      throw boom.notFound("No existe")
    }
    delete user.dataValues.password
    return user         
  }
  async findInterByMovie(type,movieId){
    let options
    if(type==="movie"){
       options ={
        include: [                       
         {
         association: "userMovie",
         attributes:["title"],
         where: { id: movieId }
        }
      ]
       }
      }
    else{
       options={
        include:[
          {
            association: "userTv",
              attributes:["name"],
              where: { id: movieId }
            }
      ]
    }        
      }
      const res = await models.User.findAll(options)
      return res      
  }
  async findInter(userId,type,movieId){
    let interaction
if(type==="movie"){
  interaction= await models.UserMovie.findOne({where:{userId,movieId}})
  }
  else{
    interaction= await models.UserTv.findOne({where:{userId,tvId:movieId}})
    }
    if(interaction){
      return interaction
    }else{
      throw boom.notFound("No hay interactiones")
    }}  
  async findUserInteraction(userId,type,movieId){
    const userInter=await this.findInter(userId,type,movieId)
    return userInter         
  }
  async findUserList(userId, type) {
    try {
      const user = await this.findOne(userId);
      if (!user) {
        console.log(`No se encontró el usuario con el ID: ${userId}`);
        return []; // Devolver una lista vacía si el usuario no existe
      }
  console.log("el user",user)
      const userList = user.userList || [];
      console.log("la lista",userList)
      if (userList.length === 0) {
        console.log(`El usuario con el ID: ${userId} no tiene listas asociadas`);
        return []; // Devolver una lista vacía si no hay listas asociadas al usuario
      }
  
      if (type === "movie") {
        const moviesList = userList[0].moviesList || [];
        console.log(`Películas encontradas para el usuario con el ID: ${userId}:`, moviesList);
        return moviesList;
      } else {
        const tvsList = userList[0].tvsList || [];
        console.log(`Series encontradas para el usuario con el ID: ${userId}:`, tvsList);
        return tvsList;
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuario:', error.message || error);
      throw new Error('No se pudo obtener la lista de usuario');
    }
  }
    async findUser(nick){
    const nickUser=await models.User.findOne({
      where: {nick}
    })
    return nickUser
  }
  async create(data) {
    const hash= await bcrypt.hash(data.password, 10)
    const newUser = await models.User.create({
      ...data,
      password: hash}
    )
    delete newUser.dataValues.password
    return newUser;
  }
  async update(id, changes) {
    const user = await this.findOne(id)
    const res = await user.update(changes)
    return res
  }
  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy(id)
    return {id}
  }
  async  getTopRatedMovies() {
    try {
      // Usamos una consulta SQL cruda
      const [results, metadata] = await sequelize.query(`
        SELECT 
          m.id,
          m.title,
          AVG(um.rank) AS averageRating,  -- Promedio de puntuaciones
          COUNT(um."userId") AS numberOfRatings  -- Número de usuarios que puntuaron
        FROM movies m
        INNER JOIN user_movie um ON m.id = um."movieId"  -- Relacionar las tablas
        GROUP BY m.id  -- Agrupar por película
        HAVING COUNT(um."userId") > 0  -- Solo películas con al menos una puntuación
        ORDER BY AVG(um.rank) DESC  -- Ordenar por el promedio de puntuaciones (descendente)
        LIMIT 10;  -- Limitar a las 10 películas mejor puntuadas
      `);
  
      return results;
    } catch (error) {
      console.error('Error al obtener las películas mejor puntuadas:', error);
    }
  }
  // async getTopRatedMovies() {
  //   try {
  //     const topRatedMovies = await Movies.findAll({
  //       attributes: [
  //         'id',
  //         'title',
  //         [Sequelize.fn('AVG', Sequelize.col('userMovie.rank')), 'averageRating'],  // Calcular promedio de rank
  //         [Sequelize.fn('COUNT', Sequelize.col('userMovie.userId')), 'numberOfRatings']  // Cantidad de puntuaciones
  //       ],
  //       include: [{
  //          model: UserMovie,
  //         as: 'userMovie',
  //         attributes: []  // No necesitamos atributos específicos del UserMovie, solo los datos agregados
  //       }],
  //       group: ['Movie.id'],  // Agrupar por id de la película
  //       order: [[Sequelize.fn('AVG', Sequelize.col('userMovie.rank')), 'DESC']],  // Ordenar por el promedio de puntuaciones (descendente)
  //       having: Sequelize.literal('COUNT(userMovie.userId) > 0'),  // Solo películas con puntuaciones
  //       limit: 10  // Por ejemplo, traer las 10 mejor puntuadas
  //     });  
  //     return topRatedMovies;
  //   } catch (error) {
  //     console.error('Error al obtener las películas mejor puntuadas:', error);
  //   }
  // }

  
  async findTopRatedMoviesByInteraction(type) {
    let options;    
    if (type === "movie") {
      options = {
        attributes: [
          'movieId',
          [Sequelize.fn('AVG', Sequelize.col('userMovie[0].UserMovie.rank')), 'averageRank']
        ],
        include: [
          {
            association: "userMovie",
            attributes: ["title"],
            // where: { id: movieId }
          }
        ],
        group: ['movieId', 'UserMovie.rank'],  // Agrupa por movieId y userMovie.id para calcular el promedio
        order: [[Sequelize.fn('AVG', Sequelize.col('userMovie[0].UserMovie.rank')), 'DESC']]  // Ordena por promedio descendente
      };
     }
    // else {
    //   options = {
    //     attributes: [
    //       'tvId',
    //       [Sequelize.fn('AVG', Sequelize.col('userTv[0].UserTv.rank')), 'averageRank']
    //     ],
    //     include: [
    //       {
    //         association: "userTv",
    //         attributes: ["name"],
    //         where: { id: movieId }
    //       }
    //     ],
    //     group: ['tvId', 'userTv.id'],
    //     order: [[Sequelize.fn('AVG', Sequelize.col('userTv[0].UserTv.rank')), 'DESC']]
    //   };
    // }  
    console.log("ESTO QUIERO VER",options)

    const result = await serviceMovie.find(options);
    return result;
  }


  async findTopRatedMoviesForCarousel(type) {
    let options;
  
    if (type === "movie") {
      // const movId = await serviceMovie.getMovieId(Movie.id)

      options = {
        attributes: [
          'id',  // ID de la película
          'title',  // Título de la película
          'posterPath',  // Ruta del póster de la película (o cualquier otro atributo que tengas)
          [Sequelize.fn('AVG', Sequelize.col('userMovie[0].UserMovie.rank')), 'averageRank']
        ],
        include: [
          {
            association: "userMovie",
            attributes: []  // No necesitamos duplicar atributos si ya están en el select principal
          }
        ],
        group: ['Movie.id'],  // Agrupamos por ID de la película para el promedio
        order: [[Sequelize.fn('AVG', Sequelize.col('userMovie[0].UserMovie.rank')), 'DESC']]  // Ordena por promedio descendente
        };
     } 
    //  else {
    //   options = {
    //     attributes: [
    //       'id',  // ID de la serie
    //       'name',  // Nombre de la serie
    //       'posterPath',  // Ruta del póster de la serie (o cualquier otro atributo que tengas)
    //       [Sequelize.fn('AVG', Sequelize.col('userTv.rank')), 'averageRank']
    //     ],
    //     include: [
    //       {
    //         association: "userTv",
    //         attributes: []  // No necesitamos duplicar atributos si ya están en el select principal
    //       }
    //     ],
    //     group: ['Tv.id'],
    //     order: [[Sequelize.fn('AVG', Sequelize.col('userTv.rank')), 'DESC']]
    //   };
    // }
    console.log("ESTO QUIERO VER",options)

    const result = await serviceMovie.find(options);  // Cambia a 'models.Tv' si es para series
    return result;
  }
}

module.exports = UserService;
