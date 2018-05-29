var express = require('express');
var app = express();
var multer  = require('multer');
var path = require('path');
var fs = require('fs');

var args = process.argv.slice(2);
var storagePath = args.length > 0? args[0] : './';

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, storagePath);
    },
    filename: function(req, file, callback) {
        console.log(file);
        // callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage });


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



// app.use(express.static(__dirname));
app.use(express.static(storagePath));

app.get('/', function (req, res) {
    res.send('NBC - Videoflow - Storage');
});

function uploadMiddleware(req, res) {
    upload.single('file')(req, res, function(err) {
        if(err){
            console.log(err);
            res.json(err);
        } else {
            res.end('File is uploaded')
        }

    })
}

app.post('/', uploadMiddleware);
app.put('/', uploadMiddleware);


var port            = process.env.PORT || 8080;
var host            = '0.0.0.0';
var server          = app.listen(port, host, function(){
    console.log('File server running on ' + storagePath);
});


