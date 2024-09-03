const boom = require('@hapi/boom');

const {models} = require("../libs/sequelize")

class FavoritosService {
  constructor() {
  }  
  async create(data) {
    const newFavoritos = await models.Favoritos.create(data,{
      include: ["movies","user"]      
    })
    return newFavoritos;
  }
  async findOne(id) {    
    const favorito = await models.Favoritos.findByPk(id,{include:["movies","user"]})
    if(!favorito){
      throw boom.notFound("No existe")
    }
    return favorito;
  }
  async update(id, changes) {
    const favoritos = await this.findOne(id)
    const res = await favoritos.update(changes)
    return res
  }
  async delete(id) {
    const favoritos = await this.findOne(id)
    await favoritos.destroy(id)
    return {id}
  }
}
module.exports = FavoritosService;