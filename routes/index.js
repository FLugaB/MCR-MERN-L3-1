const route = require(`express`).Router();

const { findAllUser, findOneUser, createUser, removeUser, updateUser } = require('../constrollers/userController')

const errorsLog  = require('../middleware/errorHandler');

route.post('/register',  createUser);
route.put('/users/:id',  updateUser);
route.get('/users/:id',  findOneUser);



route.use(errorsLog);

module.exports = route

