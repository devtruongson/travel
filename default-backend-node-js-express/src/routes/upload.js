// const express = require('express');
// const fs = require('fs');
// const multer = require('multer');
// const path = require('path');

// const router = express.Router();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadPath = path.join(__dirname, '../public/files');

//         fs.access(uploadPath, (err) => {
//             if (err) {
//                 fs.mkdir(uploadPath, { recursive: true }, (err) => {
//                     if (err) return cb(err, uploadPath);
//                     return cb(null, uploadPath);
//                 });
//             } else {
//                 // Nếu đã tồn tại, chuyển ngay
//                 return cb(null, uploadPath);
//             }
//         });
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// const initApiUpload = (app) => {
//     router.post('/', upload.single('file'), (req, res) => {
//         return res.status(200).json({
//             msg: 'Upload thành công',
//             code: 0,
//             data: {
//                 name_file: req.file?.filename,
//                 url_public: `/v1/upload/public/${req.file?.filename}`,
//             },
//         });
//     });
//     router.get('/public/:filename', (req, res) => {
//         const { filename } = req.params;
//         const filePath = path.join(__dirname, '../public/files', filename);
//         res.sendFile(filePath, (err) => {
//             if (err) {
//                 return res.status(404).json({
//                     msg: 'not found',
//                     code: 0,
//                     data: null,
//                 });
//             }
//         });
//     });
//     return app.use('/v1/upload', router);
// };

// module.exports = initApiUpload;
