const {ValidationError}= require("sequelize")
const boom=require("@hapi/boom")

function logErrors(err, req, res, next) {
    console.log(err)
    next(err);
}
function errorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        return res.status(output.statusCode).json(output.payload);
      }
      next(err); // Pasar otros errores
}
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload)
    } else {
        next(err)
    }
}

function ormErrorHandler(err, req, res, next){
    if(err instanceof ValidationError){
        res.status(409).json({
            statusCode:409,
            message: err.name,
            error: err.errors
        });        
    }
    next(err)
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }