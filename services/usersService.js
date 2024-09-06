const boom = require('@hapi/boom');

const {models} = require("./../libs/sequelize")

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  }

  async find() {
    const res = await models.User.findAll({include:{association: "favoritos",include: ["mov"]}})
    return res
  }

  async findOne(id) {
    const user = await models.User.findByPk(id,{include:{association: "favoritos",include: ["mov"]}})
    if(!user){
      throw boom.notFound("No existe")
    }
    return user;
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
}

module.exports = UserService;