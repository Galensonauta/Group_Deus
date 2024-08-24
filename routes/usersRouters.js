const express = require('express'); // Requerir libreria express
// const { faker } = require("@faker-js/faker");
const router = express.Router();


router.get('/', (req, res) => {
      const { limit, offset } = req.query;
      if (limit && offset) {
        res.json({
          limit,
          offset
        });
      } else {
        res.send('No hay parametros');
      }
    });


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