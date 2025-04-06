const { where } = require('sequelize');
const db = require('../models');

class productController {
    async getAllProductController(req, res) {
        try {
            const products = await db.Product.findAll({
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['id', 'url'],
                    },
                ],
            });
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
            const { name, description, price, address, roomType } = req.body;
            if (!name || !description || !price || !address || !roomType) {
                return res.status(200).json({
                    msg: 'Vui lòng nhập đủ thông tin!',
                    code: 1,
                    data: null,
                });
            }
            const product = await db.Product.create({
                ...req.body,
            });

            if (req.body.listFile && Array.isArray(req.body.listFile)) {
                await Promise.all(
                    req.body.listFile.map((fileUrl) =>
                        db.Image.create({
                            url: fileUrl,
                            productId: product.dataValues.id,
                        }),
                    ),
                );
            }
            return res.status(200).json({
                msg: 'Tạo Phòng thành công',
                code: 0,
                data: null,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async deleteProductController(req, res) {
        try {
            await db.Product.destroy({
                where: { id: req.params.id },
            });
            await db.Image.destroy({
                where: { productId: req.params.id },
            });
            return res.status(200).json({
                msg: 'Xóa thành công',
                code: 0,
                data: null,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async getProductController(req, res) {
        try {
            const product = await db.Product.findOne({
                where: { id: req.params.id },
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['id', 'url'],
                    },
                ],
            });
            if (!product) {
                return res.status(200).json({
                    msg: 'Không tìm thấy Phòng',
                    code: 1,
                    data: null,
                });
            }

            return res.status(200).json({
                msg: 'Thông tin phòng',
                code: 0,
                data: product,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async updateProductController(req, res) {
        try {
            console.log('req.bd >>> ', req.boby);
            // await db.Product.update(
            //     { ...req.body },
            //     {
            //         where: { id: req.boby.id },
            //     },
            // );
            // if (req.body.listFile && Array.isArray(req.body.listFile)) {
            //     await Promise.all(
            //         req.body.listFile.map((fileUrl) =>
            //             db.Image.create({
            //                 url: fileUrl,
            //                 productId: product.dataValues.id,
            //             }),
            //         ),
            //     );
            // }
            // if (req.body.listOldFile && Array.isArray(req.body.listOldFile)) {
            //     await Promise.all(
            //         req.body.listOldFile.map((id) =>
            //             db.Image.destroy({
            //                 where: { id: id },
            //             }),
            //         ),
            //     );
            // }
            // return res.status(200).json({
            //     msg: 'Update thành công',
            //     code: 0,
            //     data: null,
            // });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

module.exports = new productController();
