var express = require('express');
var app = express();
var multer  = require('multer');
var path = require('path');
var fs = require('fs')

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        // callback(null, './');
        callback(null, 'X:');
    },
    filename: function(req, file, callback) {
        console.log(file);
        // callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage });


// app.use(express.static(__dirname));
app.use(express.static("X:"));

app.get('/', function (req, res) {
    res.send('NBC - Videoflow - Storage');
});

app.post('/', function(req, res) {
    // upload.single('userFile');
    upload.single('file')(req, res, function(err) {
        if(err){
            console.log(err);
            res.json(err);
        } else {
            res.end('File is uploaded')
        }

    })
});


var port            = process.env.PORT || 8080;
var host            = '0.0.0.0';
var server          = app.listen(port, host, function(){
    console.log('File server running');
});


