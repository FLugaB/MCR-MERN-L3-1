const { getDatabase } = require('../config/mongosConfig')
const { hashPass } = require('../helpers/bycrpt')
const { ObjectId } = require('mongodb')


class User {

    static user(){
        const db = getDatabase()
        return db.collection('users')
    }

    static findAll(){
        return this.user().find().toArray()
    }

    static findOne(id){
        return this.user().findOne({ _id: ObjectId(id)})
    }

    static findUniqueUser(email){
        return this.user().findOne({ email: email })
    }

    static createOne(newUser){
        newUser.password = hashPass(newUser.password)
        return this.user().insertOne(newUser)
    }

    static findOneDelete(id){
        return this.user().findOneAndDelete({ _id: ObjectId(id)})
    }

    static findOneUpdate(data){
        data.password = hashPass(data.password)
        const dataUpdate = {
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role,
            phoneNumber: data.phoneNumber,
            address: data.address
        }
        return this.user().findOneAndReplace(
        { _id: ObjectId(data.id)}, dataUpdate)
    }

}

module.exports = User