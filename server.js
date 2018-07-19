/////////////////////////////
// Application Dependencies//
/////////////////////////////

//Our instance of Express, a Nodejs framework for HTTP servers.
const express = require('express');
const app = express();

//path is a node's built in module that provides utilities for working with files and directories paths.
var path = require('path');

//Body Parser is a middleware to parse incoming requests bodies before they reach our handlers.
var bodyParser = require ('body-parser');

////////////////////////
// Application Methods//
////////////////////////

//What this means is that this middleware will make available to the app all the files in the public directory. To <link> it in the .html file your path is no longer from the .html file to the .css file but straight from /public in our case is <link rel="stylesheet" href="/css/styles.css">
app.use(express.static('app/public'));

// tell express to use this middleware to parse urlencoded bodies.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//////////
//Routes//
//////////

require("./app/routes/apiRoutes.js")(app);
require("./app/routes/htmlRoutes.js")(app);


//start listening


app.listen(process.env.PORT || 8080, function() {
    console.log("app listening on port 8080!. Go to http://localhost:8080"); //confirm app is listening
});