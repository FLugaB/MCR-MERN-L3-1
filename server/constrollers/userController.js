const User = require('../models/user')
const { ObjectId } = require('mongodb')
const { compareHash } = require('../helpers/bycrpt')
const {  getToken } = require('../helpers/jwt')

const findAllUser = async (req, res, next) => {
    try {

        const response = await User.findAll()
        if (!response) throw { name: "INTERNAL_SERVER_ERROR" }

        response.map(e => { delete e.password })

        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
}

const findOneUser = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id) throw { name: "USER_NOT_FOUND" }
        if (id.length < 24 || id.length > 24 ) throw { name: "USER_NOT_FOUND" }

        const response = await User.findOne(id)

        if (!response) throw { name: "USER_NOT_FOUND" }

        delete response.password

        res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {

        const { username, email, password, role, phoneNumber, address } = req.body

        if (!username) throw { name: "USERNAME_NOT_NULL" }
        if (!email) throw { name: "EMAIL_NOT_NULL" }
        if (!password) throw { name: "PASSWORD_NOT_NULL" }
        if (!role) throw { name: "ROLE_NOT_NULL" }

        const findOneUser = await User.findUniqueUser(email)

        if (!findOneUser) {

            const newUser = {
                username,
                email,
                password,
                role,
                phoneNumber,
                address
            }

            const response = await User.createOne(newUser)
            const findNewuser = await User.findOne(response.insertedId)
            

            res.status(201).json({
                username: findNewuser.username,
                email: findNewuser.email,
                role: findNewuser.role
            })


        } else {

            throw { name: "EMAIL_UNIQUE" }
        }
        
    } catch (error) {
        next(error)
    }
}

const removeUser = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id) throw { name: "USER_NOT_FOUND" }
        if (id.length < 24) throw { name: "USER_NOT_FOUND" }

        const response = await User.findOneDelete(id)

        if (!response.value) throw { name: "USER_NOT_FOUND" }

        const successText = `Success remove ${response.value.email},`

        res.status(200).json({successText})
        
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {

        const { id } = req.params
        const {  username, email, password, role, phoneNumber, address  } = req.body

        if (!id) throw { name: "USER_NOT_FOUND" }
        if (id.length < 24) throw { name: "USER_NOT_FOUND" }

        if (!username) throw { name: "USERNAME_NOT_NULL" }
        if (!email) throw { name: "EMAIL_NOT_NULL" }
        if (!password) throw { name: "PASSWORD_NOT_NULL" }
        if (!role) throw { name: "ROLE_NOT_NULL" }

        const updateUser = {
            id,
            username,
            email, 
            password,
            role,
            phoneNumber,
            address
        }

        const findUniqueEmail = await User.findUniqueUser(updateUser.email)

        if (findUniqueEmail && ObjectId(findUniqueEmail._id) != id) throw { name: "EMAIL_UNIQUE" }

        const response = await User.findOneUpdate(updateUser)

        const successText = `Success Update ${response.value.email}`
        res.status(200).json({successText})
        
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const findUniqueEmail = await User.findUniqueUser(email)

        if (!findUniqueEmail) throw { name: `USER_NOT_FOUND` }

        const verfyPass = compareHash(password, findUniqueEmail.password)

        if (!verfyPass) throw { name: `USER_NOT_FOUND` }

        const payload = { 
            id: findUniqueEmail.email,
            role: findUniqueEmail.role
        }

        const access_token = getToken(payload)

        res.status(200).json({access_token});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    findAllUser,
    findOneUser,
    createUser,
    removeUser,
    updateUser,
    login
}