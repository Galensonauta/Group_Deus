const boom = require("@hapi/boom")

// Clase de la entidad donde se define la logica de negocio para
// esa entidad en particular

class CategoriesService {
  constructor() {
    this.categories =[
          {
            id: "28",
            name: "Action"
          },
          {
            id: "12",
            name: "Adventure"
          },
          {
            id: "16",
            name: "Animation"
          },
          {
            id: "35",
            name: "Comedy"
          },
          {
            id: "80",
            name: "Crime"
          },
          {
            id: "99",
            name: "Documentary"
          },
          {
            id: "18",
            name: "Drama"
          },
          {
            id: "10751",
            name: "Family"
          },
          {
            id: "14",
            name: "Fantasy"
          },
          {
            id: "36",
            name: "History"
          },
          {
            id: "27",
            name: "Horror"
          },
          {
            id: "10402",
            name: "Music"
          },
          {
            id: "9648",
            name: "Mystery"
          },
          {
            id: "10749",
            name: "Romance"
          },
          {
            id: "878",
            name: "Science Fiction"
          },
          {
            id: "10770",
            name: "TV Movie"
          },
          {
            id: "53",
            name: "Thriller"
          },
          {
            id: "10752",
            name: "War"
          },
          {
            id: "37",
            name: "Western"
          }
        ]
  }  
   // Retorna los productos almacenados
   async find() {
    const category= this.categories;
    if(!category){
      throw boom.notFound("No existe la categoria")
    }else{
      return category  
    }    
  }
  // Retorna el elemento buscado por id
  async findOne(id) {
    const category=this.categories.find((item) => item.id === id);
    if(!category){
      throw boom.notFound("No existe la categoria")
    }else{
      return category  
    } 
  }
}


module.exports= CategoriesService