const boom = require("@hapi/boom")
const {models} = require("../libs/sequelize")

// Clase de la entidad donde se define la logica de negocio para
// esa entidad en particular

class MoviesService {
  constructor() {}

  async create(data) {
    const newMovie = await models.Movies.create(data)
    return newMovie;
  }
   // Retorna los productos almacenados
   async find() {
    const movie= await models.Movies.findAll();
    if(!movie){
      throw boom.notFound()
    }else{
      return movie  
    }    
  }
  // Retorna el elemento buscado por id
  async findOne(id) {
    const movie=await models.Movies.findByPk(id)
    if(!movie){
      throw boom.notFound("No existe la pelicula")
    }else{
      return movie  
    } 
  }
  async update(id, changes) {
    const movie = await this.findOne(id)
    const res = await movie.update(changes)
    return res
  }
  async delete(id) {
    const movie = await this.findOne(id)
    await movie.destroy(id)
    return {id}
  }
}

module.exports= MoviesService

 //   this.movies =[
  // //   {    
  //   "id": "0",
  //   "title": "Trap",
  //   "original_title": "Trap",
  //   "overview": "A father and teen daughter attend a pop concert, where they realize they're at the center of a dark and sinister event.", 
  //   "media_type": "movie",    
  //   "genre_ids": [
  //     53
  //   ],
  //   "popularity": 398.238,
  //   "release_date": "2024-07-31",   
  // },
  // {   
  //   id: 1,
  //   "title": "Borderlands",
  //   "original_title": "Borderlands",
  //   "overview": "Returning to her home planet, an infamous bounty hunter forms an unexpected alliance with a team of unlikely heroes. Together, they battle monsters and dangerous bandits to protect a young girl who holds the key to unimaginable power.",
  //   "media_type": "movie",   
  //   "genre_ids": [
  //     28,
  //     878,
  //     35
  //   ],
  //   "popularity": 272089,
  //   "release_date": "2024-08-07",   
  // },
  // {   
  //   "id": 2,
  //   "title": "The Deliverance",
  //   "originalTitle": "The Deliverance",
  //   "overview": "Ebony Jackson, a struggling single mother fighting her personal demons, moves her family into a new home for a fresh start. But when strange occurrences inside the home raise the suspicions of Child Protective Services and threaten to tear the family apart, Ebony soon finds herself locked in a battle for her life and the souls of her children.",
  //   "popularity": 44492,
  //   "releaseDate": "2024-08-16",   
  // },
  // {   
  //   "id": 0,
  //   "title": "Longlegs",
  //   "originalTitle": "Longlegs",
  //   "overview": "FBI Agent Lee Harker is assigned to an unsolved serial killer case that takes an unexpected turn, revealing evidence of the occult. Harker discovers a personal connection to the killer and must stop him before he strikes again.",
  //   "popularity": 1333526,
  //   "releaseDate": "2024-07-10",
  // },
  // {
  //   id: "1",
    // "title": "Kinds of Kindness",
    // "originalTitle": "Kinds of Kindness",
    // "overview": "A triptych fable following a man without choice who tries to take control of his own life; a policeman who is alarmed that his wife who was missing-at-sea has returned and seems a different person; and a woman determined to find a specific someone with a special ability, who is destined to become a prodigious spiritual leader.",  //   
    // "popularity": 508.804,
    // "releaseDate": "2024-05-30",
  // },
  // {  
  //   id: "5",
  //   "title": "Inside Out 2",
  //   "original_title": "Inside Out 2",
  //   "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
  //   "media_type": "movie",
  //   "genre_ids": [
  //     16,
  //     10751,
  //     12,
  //     35
  //   ],
  //   "popularity": 2250.655,
  //   "release_date": "2024-06-11",    
  // }
  //   ]  