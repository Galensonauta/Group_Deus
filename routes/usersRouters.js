const express = require('express');
const router = express.Router();
const passport=require("passport")
const { checkRoles } = require('../middlewares/authHandler');


const UserService = require('./../services/usersService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { updateUserSchema, createUserSchema, getUserSchema,getUserInteractionSchema } = require('./../schemas/usersSchema');

const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
router.get("/interactions-movies/:type/:movieId",
async (req,res,next)=>{
  try{
    const{type,movieId}=req.params
    const interaction= await service.findInterByMovie(type,movieId)
    res.json(interaction)
  }catch(error){
    next(error)
  }
}
)

router.get('/my-interaction-detail/:type/:movieId',
  passport.authenticate("jwt", {session:false}),
  validatorHandler(getUserInteractionSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user.sub
      const {type,movieId } = req.params;
      const userList= await service.findUserInteraction(user,type,movieId);
      res.json(userList);
    } catch (error) {
      next(error);
    }
  }
);
router.get('/my-interaction-list/:type',
  passport.authenticate("jwt", {session:false}),
  async (req, res, next) => {
    try {
      const { type } = req.params;
      const userId = req.user.id
      const interactionUser= await service.findUserList(userId,type);
      res.json(interactionUser);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate("jwt", {session:false}),
  checkRoles("admin","citizen"),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
  passport.authenticate("jwt", {session:false}),
  checkRoles("admin"),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);
router.get("/rank/:type",
  async (req,res,next)=>{
    try{
      const{type}=req.params
      const rank= await service.getTopRatedMovies(type)
      res.status(200).json(rank)
    }catch(error){
      next(error)
    }
  }
  )
module.exports= router;