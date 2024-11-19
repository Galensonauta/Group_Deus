const bcrypt = require("bcrypt")


async function hashPass(){
const myContra="admin123456"
const passHasheada ="$2b$10$RwZC55qnrRHI7Hl3fwnge.lCrCXizxPOHGrhdcEeFImXAdBB59yLy"
const hash= await bcrypt.hash(myContra, passHasheada)
console.log(hash)
}

hashPass()