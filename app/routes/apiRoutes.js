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
            //the response is a json
            res.json(data);
        });
    });
    //add a new contact the database
app.post('/api/addContact', function (req, res) {
    var contact = req.body;
    orm.addContact( contact, function(data) {
            console.log("This is the data we post with express using the orm through apiRoutes.js " + data);
        });
 
});
    //search contacts
    app.get('/api/:searchContact?', function(req, res){
         
        if(req.params.searchContact){
            console.log("we got data");
            orm.searchContact(req.params.searchContact, function(data){
                res.json(data);
            });
            
        }
        else {
            console.log("got nothing");
           
        }
    	
    });

};