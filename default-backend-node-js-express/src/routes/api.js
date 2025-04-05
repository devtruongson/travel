const { loginController, registerController, getAllUserController } = require('../controllers/userController');
const { getAllProductController, createProductController } = require('../controllers/productController');

const Route = require('express').Router();

const initialApiApp = (app) => {
    // user
    Route.post('/login', loginController);
    Route.post('/register', registerController);
    Route.get('/user', getAllUserController);

    // product
    Route.get('/product', getAllProductController);
    Route.post('/product', createProductController);

    app.use('/api/v1/app', Route);
};

module.exports = initialApiApp;
