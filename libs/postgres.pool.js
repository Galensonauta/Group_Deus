const {Pool} = require ("pg")

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "Galenso_Serrano",
    password: "passPostgress.24",
    database: "Grupo_Deus"
})

module.exports = pool
