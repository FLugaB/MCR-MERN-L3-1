const { connect, getDatabase } = require('../config/mongosConfig')
require('dotenv').config();
const fs = require('fs')

const dataUser = JSON.parse(fs.readFileSync(`./data/user.json`, `utf8`));

connect()
    .then( async () => {
        const db = getDatabase()
        const response = await db.collection('users').insertMany(dataUser)
        console.log(response)
    })
    .catch( (err) => console.log(err))