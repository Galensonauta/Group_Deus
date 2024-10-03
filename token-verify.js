const jwt = require("jsonwebtoken")

const secret= "mordelon"
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNzkyNTEwMH0.1DDXc9xIjs04uyT12eZmGDpVJ2Rz9JH9_Y6urEyMOzI"
function verifyToken(token, secret){
    return jwt.verify(token, secret)
}
const payload= verifyToken(token, secret)
console.log(payload)