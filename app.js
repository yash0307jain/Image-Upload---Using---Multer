const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage });

app.post('/uploadfile', upload.single('myfile'), (req, res, next) => {
    const file = req.file;
    if(!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
})

const port = 3000;
app.listen(port, () => {
    console.log('Server is working on port ' + port)
})