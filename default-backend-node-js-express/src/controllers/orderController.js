const { where } = require('sequelize');
const db = require('../models');

class orderController {
    async createOrderController(req, res) {
        try {
            const { productId, userId } = req.body;
            if (!productId || !userId) {
                return res.status(400).json({
                    msg: 'Vui lòng điền đủ thông tin',
                    code: 0,
                    data: null,
                });
            }

            const product = await db.Product.findOne({
                where: {
                    id: productId,
                },
            });
            if (!product) {
                return res.status(400).json({
                    msg: 'Không tìm thấy sản phẩm',
                    code: 0,
                    data: null,
                });
            }
            const order = await db.Order.create({
                ...req.body,
                totalPrice: product.dataValues.price,
            });
            return res.status(200).json({
                msg: 'Lấy danh sách sản phẩm thành công!',
                code: 0,
                data: order,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

module.exports = new orderController();
