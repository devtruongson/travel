'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate(models) {
            Image.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
        }
    }
    Image.init(
        {
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'Image',
        },
    );
    return Image;
};
