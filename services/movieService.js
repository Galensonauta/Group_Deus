
//"Lo importante es hacer el bien, sin importar que para eso se requiera la ayuda del mal"
//"A veces en el camino infinito del mal y del bien, necesitan interactuar para seguir adelante con sus inexorables cometidos"
const boom = require("@hapi/boom")
const {models} = require("../libs/sequelize")
const axios = require('axios');
const apiTMDB  = process.env.API_KEY

class MoviesService {
  constructor() 
    {
      this.api = axios.create({
        baseURL: 'https://api.themoviedb.org/3/',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: apiTMDB,
        },
      })    
  }  
  // Retorna los productos almacenados
  
 async find(query) {
   const options={
    include:[
      "list",
      "userMovie"],
      association: "userMovie",
      attributes:["title","id"]
  }
    const { offset,limit}=query
    if(offset&&limit){
      options.offset=offset
      options.limit=limit
    }    

  const movie= await models.Movies.findAll(options);
  if(!movie){
    throw boom.notFound()
  }else{
    return movie  
  }    
}   
  async findOneMovie(id) {   
    const movie = await models.Movies.findByPk(id)
    if(!movie){
      throw boom.notFound("No existe")
    }
    return movie;}
    async findOneTv(id){
      const tv = await models.Tvs.findByPk(id)
      if(!tv){
        throw boom.notFound("No existe")}
      
      return tv;
      } 
  async getMovieId(id){
    // Obtener la película desde la API de TMDb    

    const response =await this.api.get(`movie/${id}?language=es-LA`)
    const responseCredits = await this.api.get(`movie/${id}/credits?language=es-LA`); 

      const movieData = response.data
      const movieCredits = responseCredits.data
      if (!movieData) {
        throw boom.notFound('La película no fue encontrada en TMDb');
       }
       const movie = await models.Movies.findOne({
         where: { id: movieData.id }
       });
       if (!movie) {
         const newMovie = await models.Movies.create({
           id: movieData.id,             // Utilizar el ID de TMDb como ID en tu base de datos
           title: movieData.title,
           original_title:movieData.original_title,
           adult: movieData.adult,
           backdrop_path: movieData.backdrop_path,
           media_type:movieData.media_type,
           original_language:movieData.original_language,
           overview:movieData.overview,
           vote_count:movieData.vote_count,
           popularity:movieData.popularity,
           poster_path:movieData.poster_path,
           release_date:movieData.release_date,
           video:movieData.video,
           vote_average:movieData.vote_average,
           genre_ids:movieData.genre_ids,
           cast: movieCredits.cast,
           crew: movieCredits.crew
         });
         return newMovie;  
       }
       return movieData
    }
    async getTvId(id){
      // Obtener la película desde la API de TMDb    
        
    const response =await this.api.get (`tv/${id}?language=es-LA`) 
    const responseCredits = await  this.api.get(`tv/${id}/credits?language=es-LA`);

      const tvData = response.data
      const tvCredits=responseCredits.data
      if (!tvData) {
        throw boom.notFound('La serie no fue encontrada en TMDb');
       }
       const movie = await models.Tvs.findOne({
         where: { id: tvData.id }
       });
       if (!movie) {
         const newTv = await models.Tvs.create({
           id: tvData.id,  // Utilizar el ID de TMDb como ID en tu base de datos
           name: tvData.name,
           original_name:tvData.original_name,
           adult: tvData.adult,
           backdrop_path: tvData.backdrop_path,
           media_type:tvData.media_type,
           original_language:tvData.original_language,
           overview:tvData.overview,
           vote_count:tvData.vote_count,
           popularity:tvData.popularity,
           poster_path:tvData.poster_path,
           first_air_date:tvData.first_air_date,
           video:tvData.video,
           vote_average:tvData.vote_average,
           genre_ids:tvData.genre_ids,
           cast: tvCredits.cast,
           crew: tvCredits.crew
         });
         return newTv;  
       }
       return tvData
    }
    async addInteraction(userId,type,movieId,body) {
      const user = await models.User.findOne({where:{id:userId}});    
      if (!user) {
        throw new Error('El usuario noe xiste');
      }    
      if(type==="movie"){
        const movie = await this.getMovieId(movieId)
        movieId=movie.id
        const userMovieInteraction = await models.UserMovie.findOne({ 
          where: { userId, movieId } 
        });
  
        if(userMovieInteraction){
          const updateInteraction=await userMovieInteraction.update({       
            comment: body.comment,
                  rank: body.rank,
                  tag: body.tag
          })
             return updateInteraction
            }else{
              const newUserInteraction = await models.UserMovie.create({
                userId,
                movieId,
                ...body
                          })
             return newUserInteraction
            }        
      }else{
        const tvId = await this.getTvId(movieId)
        movieId= tvId.id
        const userTvInteraction = await models.UserTv.findOne({ where: { userId, tvId: movieId } });
  
  
       if(userTvInteraction){
       const updateInteractionTv= await userTvInteraction.update({
        comment: body.comment,
              rank: body.rank,
              tag: body.tag
        })
            return updateInteractionTv    
            }    else{
       const newUserInteraction = await models.UserTv.create({
        userId,
        tvId: movieId,
        ...body       
      })
      return newUserInteraction
    }   
    }
  }
  async delete(id) {
    const movie = await this.findOne(id)
    await movie.destroy(id)
    return {id}
  }
} 

module.exports= MoviesService

