var express = require("express");
var mongoose = require("mongoose");

var app = express()

var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist');
mongoose.Promise = global.Promise;
console.log('connected mongodb');

app.listen(process.env.port||3000, function(){
	console.log("Server is listening on port 3000" );
});