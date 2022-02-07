const { MongoClient } = require('mongodb');


const connect = () => {
    const uri = process.env.MONGO_DB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return client.connect()
            .then(_ => {
                db = client.db('users_db')
                return client.db('users_db')
            })
            .catch( (error) => {
                console.log(error)
                throw error
            });
}

const getDatabase = () => {
    return db
}

module.exports = {
    connect,
    getDatabase
};