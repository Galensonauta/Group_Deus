// Libreria para poblar de datos falsos la app
const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom")
const sequelize = require("./../libs/sequelize")

// Clase de la entidad donde se define la logica de negocio para
// esa entidad en particular

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }
  // En este caso se crea un metodo para generar los datos falsos
  //  con fines practicos para desarrollo
  async generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
        id: faker.datatype.uuid(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  // Retorna los productos almacenados
  async find() {
    const query = "SELECT * FROM tasks"
    const [data] = await sequelize.query(query)
    return {
      data
    }
  }
  // Retorna el elemento buscado por id
  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict("producto no permitido")
    }
    return product
  }
  async update(id, data) {
    const indexProduct = this.products.findIndex((item) => item.id === id);
    if (indexProduct === -1) {
      throw boom.notFound('Product not found');
    }else{
    const product = this.products[indexProduct]
    if (product.isBlock) {
      throw boom.conflict("producto no permitido")
    }
    this.products[indexProduct] = {
      ...product,
      ...data
    };
    return this.products[indexProduct];}
  }

  async delete(id) {
    const indexProduct = this.products.findIndex((item) => item.id === id);
    const product=this.products[indexProduct]
    if (indexProduct === -1) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict("producto no permitido")
    }
    this.products.splice(indexProduct, 1);
    return { id };
  }
}

module.exports = ProductsService;


//Luego el controlador accede a la capa de servicio dependiendo del caso de uso basado
//  en la solicitud del usuario , en ella se encuentra la lógica de negocio a ejecutar ,
//   los servicios pueden acceder a las librerías o a otros servicios.

//Aqui definimos toda la logica a nivel transaccional que tendran nuestros datos
//En este proyecto podria ser crear y buscar pelis o listas, actualizar y borrar

