const {Client} = require ("pg")

async function getConnection(){
const client = new Client({
    host: "localhost",
    port: 5432,
    user: "Galenso_Serrano",
    password: "passPostgress.24",
    database: "Grupo_Deus"
})
await client.connect();
return client;
}

module.exports = getConnection

