const express = require('express');

const UserService = require('./../services/usersService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/usersSchema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
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

module.exports = router;


// router.get("/:id", (req,res)=>{
//   const {id}=req.params;
//   res.json(
// {
//   "avatar": {
//     "gravatar": {
//       "hash": "caaa79da9eeb7a1a9d4396f0d5010313"
//     },
//     "tmdb": {
//       "avatar_path": null
//     }
//   },
//   "id": 18928639,
//   "iso_639_1": "en",
//   "iso_3166_1": "AR",
//   "name": "",
//   "include_adult": false,
//   "username": "galenso"
// }
//   )
// })

module.exports= router;