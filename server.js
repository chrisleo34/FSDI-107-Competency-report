var express = require("express");
var app = express();


/****************************************** */
/***Server Configuration */
/****************************************** */

/*render HTML from the endpoints */
var ejs = require('ejs');
app.set('views', __dirname + "/public");
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

/****server static file (js,css,img,pdf) */

app.use(express.static(__dirname + '/public'));

// configure body-parser to read  req payload
var bparser = require('body-parser');
app.use(bparser.json());

// DB connection to Mongo DB
var mongoose = require('mongoose');
mongoose.connect("mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");
var mongoDB = mongoose.connection; // DB connection
var itemDB; // DB object constructor

/****************************************** */
/***Server HTML */
/****************************************** */


app.get('/', function (req, res) {
    res.render('index.html');
});

// create the /dmin endpoint
//server the min.html

app.get('/admin', function (req, res) {
    res.render('admin.html');
});

app.get('/about', function (req, res) {
    res.send('<h1 style="color:blue">Christian Mercado-Astarita</h1>');
});

app.get('/tasks', function (req, res) {
    res.send('<h2 style="color:black">I need to play Zelda! The winds if the hero survives NOT fails!!</h>');
});

app.get('/contact', function (req, res) {
    res.send('<h1 style="color: red, font-size: 25px">Please contact me at this email</h1> <address> christianmastarita3@outlook.com </address> ');
});

/****************************************** */
/***API Endpoints */
/****************************************** */
var list = [];

app.post('/API/items', function (req, res) {
    var item = req.body;

    // create DB object
    var itemForDB = itemDB(item);


    // save the obj on the db
    itemForDB.save(function (error, savedObject) {
        if (error) {
            console.log("Error saving the item" + error);
            res.status(500); // 500: Internal Server Error
            res.send(error); // = return

        }

        // no error
        res.status(201); //201: OK created
        res.json(savedObject);
    });

});

app.get('/API/items', function (req, res) {
    itemDB.find({}, function (error, data) {
        if (error) {
            res.status(500);
            res.send(error);
        }
        res.json(data);
    });
});


mongoDB.on('error', function (error) {
    console.log("error connection to DB:" + error)
});

mongoDB.on('open', function () {
    console.log("Yeea! DB Connection succeed!");

    // predefined schema for items table ( collection)
    var itemSchema = mongoose.Schema({
        code: String,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        user: String,
    });

    itemDB = mongoose.model("catalogCh9", itemSchema);
});



// start the project
app.listen(8080, function () {
    console.log("Local host running at Localhost:8080")
});


// Ctrl + C to kill the server
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

//API application programmin interface