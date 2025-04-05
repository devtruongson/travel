const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
//SON
// const sequelize = new Sequelize('travel', 'root', 'Nson091120@', {
//     host: 'localhost',
//     dialect: 'mysql',
// });

// VAN
const sequelize = new Sequelize('travel', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;
