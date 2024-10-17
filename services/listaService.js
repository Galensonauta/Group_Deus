const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require("../libs/sequelize");
const MoviesService = require('../services/movieService.js');
const serviceMovie = new MoviesService();

class ListasService {
  constructor() { }
  async find(query) {
    const options = {
      where: {},
    }
    const { rank } = query;
    if (rank) {
      options.where.rank = rank
    }
    const { rank_min, rank_max } = query;
    if (rank_min && rank_max) {
      options.where.rank = {
        [Op.between]: [rank_min, rank_max]
      };
    }
    const lista = await models.Listas.findAll({ 
      include: [
        {
          association:"userList",
        attributes:["nick"]},
        {
        association: "moviesList",
        attributes:["title"]
      },{
      association: "tvsList",
        attributes:["name"]}
      ]
    });
    if (!lista) {
      throw boom.notFound("No existen listas")
    }
    if (rank || rank_min) {
      const listaMov = await models.ListaMovie.findAll(options)
      return listaMov
    }
    return lista
  }
  // async findOne(req,type) {
  //   const id = req.user.sub;
  //   console.log(id)  // Obtener el ID del usuario autenticado desde el token JWT
  //   if(type==="movie"){
  //   const lista = await models.Listas.findByPk(id,{
     
  //     include: [
  //       {
  //         association: "userList",
  //         attributes: ["nick"],
  //         required: true  // Solo devolver si existe la relación con userList
  //       },
  //       {
  //         association: "moviesList",
  //         required: true  // Solo devolver si existe la relación con moviesList
  //       }
  //     ]
  //   })
  //   if (!lista) {
  //     throw boom.notFound("No existe")
  //   }
  //   return lista;
  // }else{
  //   const lista = await models.Listas.findOne({
  //     where: {
  //       userId: userId,      // Buscar por el ID del usuario autenticado
  //       name: 'Favoritos'    // Buscar la lista con el nombre "Favoritos"
  //     },
  //     include: [
  //       {
  //         association: "userList",
  //         attributes: ["nick"],
  //         required: true  // Solo devolver si existe la relación con userList
  //       },
  //       {
  //         association: "tvsList",
  //         required: true  // Solo devolver si existe la relación con moviesList
  //       }
  //     ],
  //     logging: console.log  // Mostrar la consulta generada por Sequelize
  //   })
  //   if (!lista) {
  //     throw boom.notFound("No existe")
  //   }
  //   return lista;
  // }    
  // }
  async createLista(data) {   
    const newListas = await models.Listas.create(data)
    return newListas;
  } 
  async addMovieToList(listId,type, id) {   
    const listaId = await models.Listas.findByPk(listId);    
    if (!listaId) {
      throw new Error('Lista de listas no encontrada');
    }
     if(type==="movie"){
      const movId = await serviceMovie.getMovieId(id)
      id=movId.id||movId.id
      const newMovie = await models.ListaMovie.create({
          listId,
          movieId:id
        }
      )
      return newMovie
      }
    else{
      const movId = await serviceMovie.getTvId(id)
      id=movId.id||movId.id
    const newTv = await models.ListaTv.create({
        listId,
        tvId:id
    })
    return newTv
    }
    
  }
  async updateLista(listId, changes) {  
    const listaId = await models.Listas.findByPk(listId);    
    if (!listaId) {
      throw new Error('Lista de listas no encontrada');
    }   
    const updateLista = await listaId.update(changes)
    return updateLista
  }
  async deleteMovie(listId,type,id) {
    const listaId = await models.Listas.findByPk(listId);    
    if (!listaId) {
      throw new Error('Lista de listas no encontrada');
    }
    if(type==="movie"){
    const movId = await serviceMovie.findOneMovie(id)
    if (!movId) {
throw boom.notFound('La película no fue encontrada en TMDb');
}
      await models.ListaMovie.destroy(
        {
          where: {
            listId,
            movieId:id
          }
        }
      )
      return  {id}  } 
      else{
        const tvId = await serviceMovie.findOneTv(id)
        if (!tvId) {
    throw boom.notFound('La serie no fue encontrada en TMDb');
    }
          await models.ListaTv.destroy(
            {
              where: {
                listId,
                tvId:id
              }
            }
          )
          return {id} 
      }  
  }    
  async deleteLista(id) {
    const listas = await this.findOne(id)
    await listas.destroy( {
      where: {
        id       
      }
    })
    return { id }
  }
}
module.exports = ListasService;

