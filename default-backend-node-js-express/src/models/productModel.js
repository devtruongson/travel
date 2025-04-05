'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Image, { foreignKey: 'productId', as: 'images' });
        }
    }
    Product.init(
        {
            name: {
                type: DataTypes.TEXT('long'),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT('long'),
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            address: {
                type: DataTypes.TEXT('long'),
                allowNull: false,
            },
            roomType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            available: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
