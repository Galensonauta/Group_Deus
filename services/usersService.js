const boom = require('@hapi/boom');
const {models} = require("./../libs/sequelize");
const bcrypt = require("bcrypt")
const sequelize = require('./../libs/sequelize.js');
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
  async  getTopRatedMovies(type) {
    try {
      if(type==="movie"){
        const [results, metadata] = await sequelize.query(`
          SELECT 
            m.id,
            m.original_title,
            m.release_date,
            m.crew,
            m.poster_path,
            ROUND(AVG(um.rank), 2) AS averageRating,  -- Redondear el promedio a 2 decimales
          COUNT(um."userId") AS numberOfRatings  -- Número de usuarios que puntuaron         
          FROM movies m
          INNER JOIN user_movie um ON m.id = um."movieId"  -- Relacionar las tablas
          WHERE um.rank IS NOT NULL  -- Excluir registros con rank NULL
          GROUP BY m.id  -- Agrupar por película
          HAVING COUNT(um."userId") > 0  -- Solo películas con al menos una puntuación
          ORDER BY AVG(um.rank) DESC  -- Ordenar por el promedio de puntuaciones (descendente)
        `);  
        return results;
      }else{
        const [results, metadata] = await sequelize.query(`
          SELECT 
            m.id,
            m.original_name,
            m.first_air_date,
            m.vote_average,
            m.crew,
             m.poster_path,
            ROUND(AVG(um.rank), 2) AS averageRating,  -- Redondear el promedio a 2 decimales
          COUNT(um."userId") AS numberOfRatings  -- Número de usuarios que puntuaron         
          FROM tv m
          INNER JOIN user_tv um ON m.id = um."tvId"  -- Relacionar las tablas
          WHERE um.rank IS NOT NULL  -- Excluir registros con rank NULL
          GROUP BY m.id  -- Agrupar por película
          HAVING COUNT(um."userId") > 0  -- Solo películas con al menos una puntuación
          ORDER BY AVG(um.rank) DESC  -- Ordenar por el promedio de puntuaciones (descendente)
        `);  
        return results;

      }      
    } catch (error) {
      console.error('Error al obtener las películas mejor puntuadas:', error);
    }
  }
 }

module.exports = UserService;
 