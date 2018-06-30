//htmlRoutes.js offers a set of routes for sending users to varios pages

//Dependency
var path = require('path');

/////////////////////////////////
// Our server's possible routes//
/////////////////////////////////

module.exports = function(app) {//let's wrap all in a module for export
    // app.get(path, callback [, callback ...]); Routes HTTP GET requests to the specified path with the specified callback functions.

    //when the server gets "/"
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, '/../public/views/main.html')); //sendFile transfers the file at the given path with the response.
    });

    ////////////////////////////////////////////
    // Our server'sresponse to not Found Path //
    ////////////////////////////////////////////

    //Handle 404 page not found. This is 100% "kosher" but I like it.
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, '/../public/views/notFound.html'));
    });
};