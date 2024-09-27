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
  async findOne(listId,type) {
    if(type==="movie"){
    const lista = await models.Listas.findByPk(listId, 
      {include: [
        {
          association:"userList",
        attributes:["nick"]},
        {
        association: "moviesList" }
      ]
    })
    if (!lista) {
      throw boom.notFound("No existe")
    }
    return lista;
  }else{
    const lista = await models.Listas.findByPk(listId, 
      {include: [
        {
          association:"userList",
        attributes:["nick"]},
        {
        association: "tvsList" }
      ]
    })
    if (!lista) {
      throw boom.notFound("No existe")
    }
    return lista;
  }
    
  }
  async createLista(data) {   
    const newListas = await models.Listas.create(data)
    return newListas;
  } 
  async addMovieToList(listId,type, id) {
   
    const listaId = await this.findOne(listId);    
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
    const listaId = await this.findOne(listId);    
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

//   async function addMovieToList(userId, listId, movieDb) {
//     // Buscar la lista para el usuario dado
//     const lista = await models.Listas.findOne({
//       where: { id: listId, userId: userId }
//     });
//     if (!lista) {
//       throw new Error('Lista no encontrada');
//     }
//     // Buscar o crear la película en la base de datos
//     const movie = await models.Movies.findOrCreateMovieFromTmdb(movieDb);
//     // Agregar la película a la lista
//     await lista.addMovie(movie);
//   }
// async function addMovieToUserList(req, res, next) {
// const { userId, listId, tmdbMovieId } = req.body;
//   try {
//   // Llamada a la API de TMDb para obtener la película
//   const { data: tmdbMovie } = await api(`movie/${tmdbMovieId}`);

//   // Agregar la película a la lista del usuario
//   await addMovieToList(userId, listId, tmdbMovie);

//   res.json({ message: 'Película agregada a la lista con éxito' });
// } catch (error) {
//   next(error);
// }
// }