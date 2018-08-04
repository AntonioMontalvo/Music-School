//Our Object Relational Mapper. Here we create the methods to convert objets to scalar values and viceversa; write functions that take inputs and conditions and turn them into database commands like SQL.


// Dependencies. Lets access mySQL
var connection = require('./mySqlConnection.js');
// this is our table
var contactsTable = 'contacts';
//this is the Object Relational Mapper
var orm = {

    showAllContacts: function(callback) {
        var syntax = 'SELECT * FROM ' + contactsTable;
        connection.query(syntax, function(err, result) {
            callback(result);
        });
    },

    addContact: function(newContactInfo, callback) {

        var syntax = 'INSERT INTO ' + contactsTable + '(first_name, last_name, date_of_birth, phone, email, num_of_lessons, level, date_created) VALUES (?,?,?,?,?,?,?,?)';

        connection.query(syntax, [newContactInfo.first_name, newContactInfo.last_name, newContactInfo.date_of_birth, newContactInfo.phone, newContactInfo.email, newContactInfo.num_of_lessons, newContactInfo.level, newContactInfo.date_created], function(error, result) {
            if (error) throw error;
            callback(result);
        });

        console.log('The info comes from orm.js addContact');


    },

    searchContact: function(name, callback) {
        var syntax = 'select * from ' + contactsTable + ' where last_name=?';

        connection.query(syntax, [name], function(err, result) {

            callback(result);
        });
    },

    updateContactInfo: function(reviewedContact, callback) {
        var syntax = 'UPDATE ' + contactsTable + ' SET `first_name`=?, `last_name`=?, `date_of_birth`=?, `phone`=?, `email`=?, `num_of_lessons`=?, `level`=?, `date_created`=? where `id`=?';

        connection.query(syntax, [reviewedContact.first_name, reviewedContact.last_name, reviewedContact.date_of_birth, reviewedContact.phone, reviewedContact.email, reviewedContact.num_of_lessons, reviewedContact.level, reviewedContact.date_created, reviewedContact.id], function(error, results) {
            if (error) throw error;
            callback(results);

        });
        console.log('The info comes from orm.js updateContactInfo: ' + reviewedContact.id);

    },

    deleteContact: function(contact, callback){
        console.log(contact.id);
        var syntax = 'DELETE FROM '  + contactsTable + ' WHERE id=?';

        connection.query(syntax, [contact.id], function(error, results){
            if(error) throw error;
            callback (results);
        });
    }
};

//lets make our orm available
module.exports = orm;