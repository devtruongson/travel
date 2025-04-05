'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.TEXT('long'),
            },
            description: {
                type: Sequelize.TEXT('long'), // Cập nhật kiểu dữ liệu này
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
            },
            address: {
                type: Sequelize.TEXT('long'),
            },
            roomType: {
                type: Sequelize.STRING,
            },
            available: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Products');
    },
};
