// Libreria para poblar de datos falsos la app
const { faker } = require("@faker-js/faker");

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
    const limit = 3;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        id: faker.datatype.uuid(),
      });
    }
  }

  async  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  // Retorna los productos almacenados
  async find() {
    return this.products;
  }
  // Retorna el elemento buscado por id
  async findOne(id) {
    return this.products.find((item) => item.id === id);
  }
  async  update(id, data) {
    const indexProduct = this.products.findIndex((item) => item.id === id);
    if (indexProduct === -1) {
      throw new Error('Product not found');
    }
    const product = this.products[indexProduct];
    this.products[indexProduct] = {
      ...product,
      ...data,
    };
    return this.products[indexProduct];
  }
  async delete(id) {
    const indexProduct = this.products.findIndex((item) => item.id === id);
    if (indexProduct === -1) {
      throw new Error('Product not found');
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

