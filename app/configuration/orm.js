//Our Object Relational Mapper. Here we create the methods to convert objets to scalar values and viceversa; write functions that take inputs and conditions and turn them into database commands like SQL.


// Dependencies. Lets access mySQL
var connection = require('./mySqlConnection.js');
// this is our table
var contactsTable = 'contacts';
//this is the Object Relational Mapper
var orm = { 

    showAllContacts: function(callback) {
        var allContacts = 'SELECT * FROM ' + contactsTable;
        connection.query(allContacts, function(err, result) {
            callback(result);
        });
    },

    addContact: function(newContactInfo, callback) {

        var contact = 'INSERT INTO ' + contactsTable + '(first_name, last_name, date_of_birth, phone, email, num_of_lessons, level, date_created) VALUES (?,?,?,?,?,?,?,?)';

        connection.query(contact, [newContactInfo.first_name, newContactInfo.last_name, newContactInfo.date_of_birth, newContactInfo.phone, newContactInfo.email,  newContactInfo.num_of_lessons,newContactInfo.level, newContactInfo.date_created], function(error, result) {
            if (error) throw error;
            callback(result);
        });

        console.log('The info comes from orm.js: ' + newContactInfo.phone.length);


    },

    searchContact: function(name, callback) {
         var s = 'select * from ' + contactsTable + ' where last_name=?';

        connection.query(s,[name], function(err, result) {
           
            callback(result);
        });
    }

};

//lets make our orm available
module.exports = orm;