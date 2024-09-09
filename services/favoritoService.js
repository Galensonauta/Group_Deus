const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require("../libs/sequelize");
const { FavoritoMovie } = require('../db/model/favoritosMovieModel');

class FavoritosService {
  constructor() {
  }
  async create(data) {
    const newFavoritos = await models.Favoritos.create(data)
    return newFavoritos;
  }
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
    const favorito = await models.Favoritos.findAll({include:["user", "mov"]});
    if (!favorito) {
      throw boom.notFound("No existen listas")
    }
    if (rank || rank_min) {
      const favoritoMov = await models.FavoritoMovie.findAll(options)
      return favoritoMov
    }
    return favorito
  }

  async findOne(id) {
  const favorito = await models.Favoritos.findByPk(id, { include: ["user", "mov"] });
  if (!favorito) {
    throw boom.notFound("No existe")
  }
  return favorito;
}  
  async addMovie(data){
  const newMovie = await models.FavoritoMovie.create(data)
  return newMovie
}
  async deleteMovie(data){
  const { favId: favId, movieId: movieId } = data
  const favoritosId = await models.Favoritos.findByPk(favId, { include: ["mov"] })
  if (favoritosId.mov.length === 0) {
    throw boom.notFound()
  } else {
    await models.FavoritoMovie.destroy(
      {
        where: {
          favId,
          movieId
        }
      }
    )
    return { data }
  }
}
  async updateFavorito(favId, movId, changes) {  
  const favoritoId = await models.Favoritos.findByPk(favId);    
  if (!favoritoId) {
    throw new Error('Lista de favoritos no encontrada');
  }
  const movieIdFav = await models.FavoritoMovie.findOne({
    where:{
      favId: favId,
      movieId:movId
    }
  })
  if (!movieIdFav) {
    throw new Error('Película no encontrada en la lista de favoritos');
  }
  console.log(favoritoId)
  console.log(movieIdFav)
  const updateFavorito = await movieIdFav.update(changes)
  return updateFavorito
}
  async delete (id) {
  const favoritos = await this.findOne(id)
  await favoritos.destroy(id)
  return { id }
}
}
module.exports = FavoritosService;