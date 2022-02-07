const route = require(`express`).Router();

const { findAllUser, findOneUser, createUser, removeUser, updateUser, login } = require('../constrollers/userController')

const errorsLog  = require('../middleware/errorHandler');


route.get('/users',  findAllUser); //Find All Users
route.post('/users',  createUser); //Add New Users
route.put('/users/:id',  updateUser); //Edit Users
route.get('/users/:id',  findOneUser); //Find User by ID
route.delete('/users/:id',  removeUser); // Delete User by ID

route.post('/login', login); // User Login


route.use(errorsLog);

module.exports = route

