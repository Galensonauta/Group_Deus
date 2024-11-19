const boom=require("@hapi/boom")
const { config } = require('./../config/config');

function checkApiKey(req,res,next){
    const apiKey= req.headers["api"]
    if(apiKey===config.apiKeyProd){
        next()
    }else{
       next( boom.unauthorized())
    }
}
//Los 3 puntos transorma todo argumento en array
function checkRoles(...roles){
    //el return que retorna otra funcion nos indica que se estan utilizando clouseres
        return(req,res,next)=>{
            console.log(req.user)
            const user=req.user;
            //Compara el role del usuario con los roles permitidos enviados
            if(roles.includes(user.role)){
                next();
            }else{
                next(boom.unauthorized());
            }
        }
    }
    

module.exports={checkApiKey,checkRoles}