const boom = require('@hapi/boom');

const {models} = require("../libs/sequelize")

class FavoritosService {
  constructor() {
  }  
  async create(data) {
    const newFavoritos = await models.Favoritos.create(data)
    return newFavoritos;
  }
  async find() {
    const favorito= await models.Favoritos.findAll({include:["user","mov"]});
    if(!favorito){
      throw boom.notFound()
    }else{
      return favorito
    }    
  }
  async findOne(id) {    
    const favorito = await models.Favoritos.findByPk(id,{include:["user","mov"]});
    if(!favorito){
      throw boom.notFound("No existe")
    }
    return favorito;
  }  
  async addMovie(data){
    const newMovie = await models.FavoritoMovie.create(data)
    return newMovie
  }

  async destroyMovie(data){
    const {  movieId  } = data;
    const movie = await models.FavoritoMovie.destroy({where:{
      movieId: movieId
    }})
    return movie + "Fue eliminada"
  }
  async update(id, changes) {
    const favorito = await this.findOne(id)
    const res = await favorito.update(changes)
    return res
  }
  async delete(id) {
    const favoritos = await this.findOne(id)
    await favoritos.destroy(id)
    return {id}
  }
}
module.exports = FavoritosService;