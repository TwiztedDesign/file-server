var express = require('express');
var app = express();
var multer  = require('multer');
var path = require('path');
var fs = require('fs');

var args = process.argv.slice(2);
var storagePath = args.length > 0? args[0] : 'X:';

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

var upload = multer({ storage: storage }).single('file');


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// app.use(express.static(__dirname));
app.use(express.static(storagePath));

app.get('/', function (req, res) {
    res.send('NBC - Videoflow - Storage');
});

function uploadMiddleware(req, res) {
    upload(req, res, function(err) {
    // upload.any()(req, res, function(err) {
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


