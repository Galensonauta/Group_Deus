const { User, UserSchema } = require('./userModel');
const { Customer, CustomerSchema } = require('./customerModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Customer.associate(sequelize.models)
}

module.exports = setupModels;