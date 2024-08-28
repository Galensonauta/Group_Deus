const {Sequelize}=require("sequelize")
const {config}=require("./../config/config")
const setupModels=require("./../db/model")


const USER= encodeURIComponent(config.dbUserMysql)
const PASS= encodeURIComponent(config.dbPasswordMysql)

const URI=`mysql://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI,{
    dialect:"mysql",
    logging:true
});

setupModels(sequelize)

sequelize.sync({alter: true} )

module.exports=sequelize