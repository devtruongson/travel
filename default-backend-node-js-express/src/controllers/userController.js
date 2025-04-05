const comparePassword = require('../helpers/comparePassword');
const hashPassword = require('../helpers/hashPassword');
const db = require('../models');
const ROLEUSER = require('../utils/constant');

class userController {
    async loginController(req, res) {
        try {
            const user = await userController.findUserController(req.body.email);

            if (!user) {
                return res.status(400).json({
                    msg: 'Tài khoản không tồn tại trong hệ thống!',
                    code: 1,
                    data: null,
                });
            }
            const isMatch = comparePassword(req.body.password, user.password);

            if (isMatch) {
                console.log(user);
                const { password, ...userWithoutPassword } = user.dataValues;
                return res.status(200).json({
                    msg: 'Đăng nhập thành công!',
                    code: 0,
                    data: userWithoutPassword,
                });
            } else {
                return res.status(400).json({
                    msg: 'Mật khẩu của bạn không chính xác!',
                    code: 1,
                    data: null,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async registerController(req, res) {
        try {
            const user = await userController.findUserController(req.body.email);

            if (user) {
                return res.status(400).json({
                    msg: 'Tài khoản đã tồn tại trong hệ thống!',
                    code: 1,
                    data: null,
                });
            }

            const passwordHash = hashPassword(req.body.password);
            const newUser = await db.User.create({
                email: req.body.email,
                password: passwordHash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: 'user',
            });

            return res.status(200).json({
                msg: 'Tạo tài khoản thành công!',
                code: 0,
                data: newUser,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async getAllUserController(req, res) {
        try {
            const users = await db.User.findAll();
            return res.status(200).json({
                msg: 'Lấy danh sách tài khoản thành công!',
                code: 0,
                data: users,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    static async findUserController(email) {
        try {
            const user = await db.User.findOne({ where: { email } });
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Server Error');
        }
    }
}

module.exports = new userController();
