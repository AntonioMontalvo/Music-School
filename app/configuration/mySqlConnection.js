// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL. Here is where we make the connection to the database. The Object relational mapping in orm.js provides all the conversions/translation we need to dump data or retrieve data.

//Our dependency is 
var mysql =require('mysql');

// we place the connections in this source object
var info = {
    // localhost
    localhost: {
	port: 3306,
	host: 'localhost',
	user: 'root',
	password: '10Yoyoyoyo',
	database: 'School_Info'
    }
}

//and stablish the connection like this
var connection = mysql.createConnection(info.localhost);

connection.connect(function(err){
	if(err){
		console.log('error connecting: ' + err.stack);
		return;
	}
	console.log("Cool, your connection to the database using mysql has been established!");
	console.log("Now you can ping the database to do CRUD.");
	console.log('Connected as id ' + connection.threadId);
});

//and lets male the connection avalable 

module.exports = connection;
