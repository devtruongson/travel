const db = require('../models');

class productController {
    async getAllProductController(req, res) {
        try {
            const products = await db.Product.findAll();
            return res.status(200).json({
                msg: 'Lấy danh sách sản phẩm thành công!',
                code: 0,
                data: products,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async createProductController(req, res) {
        try {
            const products = await db.Product.findAll();
            return res.status(200).json({
                msg: 'Lấy danh sách sản phẩm thành công!',
                code: 0,
                data: products,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

module.exports = new productController();
