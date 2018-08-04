// *********************************************************************************
// apiRoutes.js - offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// grab the orm from the config. (remember: connection.js -> orm.js -> route file)
var orm = require('../configuration/orm.js');

//API Routes are available in a module for export
module.exports = function(app) {
    //get all students in the database
    app.get('/api', function(req, res) {
        var data = orm.showAllContacts(function(data) {
            res.json(data);
        });
    });
    //add a new contact the database
    app.post('/api/addContact', function(req, res) {
        var contact = req.body;
        orm.addContact(contact, function(data) {
            console.log("This is the data we post with express using the orm through apiRoutes.js " + data);
        });

    });
    //search contacts
    app.get('/api/:searchContact?', function(req, res) {

        if (req.params.searchContact) {
            console.log("we got data to the Search Contacts search");
            orm.searchContact(req.params.searchContact, function(data) {
                res.json(data);
            });

        } else {
            console.log("got nothing");

        }

    });

    //update contact
    app.post('/api/updateContact', function(req, res) {
        var reviewedContact = req.body;
        orm.updateContactInfo(reviewedContact, function(data) {
            console.log("This is the data we put with express using the orm through apiRoutes.js " + data);
        });

    });

    //delete contact
    app.post("/api/deleteContact", function(req, res) {
            var deleteContact = req.body;
            console.log(deleteContact+ " at server post");
            orm.deleteContact(deleteContact, function(data) {
                console.log("Contact deleted from apiRoutes.js res");
            });
        });

};