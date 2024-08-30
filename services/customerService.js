const boom = require('@hapi/boom');

const {models} = require("../libs/sequelize")

class CustomerService {
  constructor() {}

  async create(data) {
    const newUser = await models.Customer.create(data)
    return newUser;
  }
  async find() {
    const res = await models.Customer.findAll()
    return res
  }
  async findOne(id) {
    const user = await models.Customer.findByPk(id)
    if(!user){
      throw boom.notFound("No existe")
    }
    return user;
  }
  async update(id, changes) {
    const customer = await this.findOne(id)
    const res = await customer.update(changes)
    return res
  }
  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy(id)
    return {id}
  }
}
module.exports = CustomerService;