var express = require('express');
var request = require('request');
var methodOverride = require('method-override');
var bodyParser = require("body-parser");


// require db module and imports model
var pg = require("pg");
var models = require("./models/index.js");

// app starts
var app = express();

// app is using bodyParser 
app.use(bodyParser.urlencoded({
    extended:true
}));

app.set('view engine', 'ejs');
app.use(methodOverride("_method"));

app.use(express.static(__dirname + '/public'));

// ROUTES
app.get("/", function(req, res){
	models.Chirp.findAll().success(function(chirps){
		res.render("index", {
			allChirps: chirps
		});
	})
	
});



// CREATE CHIRP
app.post("/new_chirp", function(req, res){
	models.Chirp.create({
		message: req.body.message
	}).success(function(){
		res.redirect('/');
	});
});

// EDIT
app.get("/edit/:id", function(req, res){
	models.Chirp.find(req.params.id).success(function(chirp){
		res.render('edit', {
			chirpMessage: chirp
		});
	});
});

app.put("/edit/:id", function(req, res){
	models.Chirp.find(req.params.id).success(function(chirp){
		chirp.updateAttributes({
			message: req.body.message
		}).success(function(){
			res.redirect("/");
		});
	});
});

app.listen(3000)