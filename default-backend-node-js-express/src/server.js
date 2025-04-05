require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const configPublic = require('./configApp/configPublic');
const connectDB = require('./configApp/connectDB');
const initialApiApp = require('./routes/api');
const port = process.env.PORT || 8080;
const cors = require('cors');

// using morgan
app.use(morgan('combined'));

// config view engine and static files
app.use(express.static(path.join(__dirname, 'public/files')));

// cors

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);
// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

//save body form data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// config public
configPublic(app);

// config routes app and api
initialApiApp(app);

//config connection from client to database
connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
