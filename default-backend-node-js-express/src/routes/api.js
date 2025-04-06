const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { loginController, registerController, getAllUserController } = require('../controllers/userController');
const {
    getAllProductController,
    createProductController,
    deleteProductController,
    getProductController,
    updateProductController,
} = require('../controllers/productController');
const { createOrderController } = require('../controllers/orderController');

const Route = require('express').Router();

// Khai báo storage trước khi sử dụng multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/files');

        fs.access(uploadPath, (err) => {
            if (err) {
                fs.mkdir(uploadPath, { recursive: true }, (err) => {
                    if (err) return cb(err, uploadPath);
                    return cb(null, uploadPath);
                });
            } else {
                // Nếu đã tồn tại, chuyển ngay
                return cb(null, uploadPath);
            }
        });
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
});

// Khai báo upload sau khi storage đã được khai báo
const upload = multer({ storage: storage });

const initialApiApp = (app) => {
    // user
    Route.post('/login', loginController);
    Route.post('/register', registerController);
    Route.get('/user', getAllUserController);

    // product
    Route.get('/product', getAllProductController);
    Route.get('/product/:id', getProductController);
    Route.post('/product', createProductController);
    Route.put('/product', updateProductController);
    Route.delete('/product/:id', deleteProductController);

    //order
    Route.post('/order', createOrderController);

    //upload
    Route.post('/upload', upload.single('file'), (req, res) => {
        return res.status(200).json({
            msg: 'Upload thành công',
            code: 0,
            data: {
                name_file: req.file?.filename,
                url_public: `http://localhost:8080/api/v1/app/public/${req.file?.filename}`,
            },
        });
    });

    Route.get('/public/:filename', (req, res) => {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../public/files', filename);
        res.sendFile(filePath, (err) => {
            if (err) {
                return res.status(404).json({
                    msg: 'not found',
                    code: 0,
                    data: null,
                });
            }
        });
    });

    app.use('/api/v1/app', Route);
};

module.exports = initialApiApp;
