const boom = require('@hapi/boom');
const {models} = require("./../libs/sequelize");
const bcrypt = require("bcrypt")


class UserService {
  constructor() {}
  async find() {
    const options ={
       include: [    
        {
          association:"userList",
          include:["moviesList"],
        },           
        {
        association: "userMovie",
        attributes:["title"]
      },
      {
      association: "userTv",
        attributes:["name"]}
      ]
    }
    const res = await models.User.findAll(options)
    return res
  }
  async findInteractionId(type,movie){
    // const user = await this.findOne(userId)
    // if(!user){
    //   throw boom.notFound("No existe")
    // }
  if(type==="movie"){
    const userMovie= await models.UserMovie.findOne({
      where: { movieId: movie}
    })   
    return userMovie
  }else{
      const userTv= await models.UserTv.findOne({
        where: {tvId: movie }
      })
    return userTv    
  }
  }
  async findOne(id) {
    const user = await models.User.findByPk(id,{  
        include: [    
         {
           association:"userList",
           include:["moviesList"],

         },           
         {
         association: "userMovie",
         attributes:["title"]
       },
       {
       association: "userTv",
         attributes:["name"]
        }
       ]})
     
      // {include:{association: "userList",include: ["moviesList"]}})
    if(!user){
      throw boom.notFound("No existe")
    }
    return user;
  }
  async findUser(nick){
    const nickUser=await models.User.findOne({
      where: {nick}
    })
    return nickUser
  }
  async create(data) {
    const hash= await bcrypt.hash(data.password, 10)

    const newUser = await models.User.create({
      ...data,
      password: hash}
    )
    delete newUser.dataValues.password
    return newUser;
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

// "nick": "Marian",
// "email": "123@mail.com",
// "password":"12345",
// "role":"circuloRojo"

// "nick": "Morgui",
// "email": "123@mail.com",
// "password":"12345",
// "role":"circuloRojo"

// "nick": "Fabi",
// "email": "123@mail.com",
// "password":"12345",
// "role":"circuloRojo"

// "nick": "Denis",
// "email": "123@mail.com",
// "password":"12345",
// "role":"circuloRojo"