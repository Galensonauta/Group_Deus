const boom = require('@hapi/boom');

const {models} = require("../libs/sequelize")

class CustomerService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data,{
      include: ["user"]
    })
    return newCustomer;
  }
  async find() {
    const res = await models.Customer.findAll({include:["user"]})
    return res
  }
  async findOne(id) {
    const user = await models.Customer.findByPk(id,{include:["customer"]})
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