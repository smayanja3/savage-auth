// server.js

// set up ======================================================================
// get all the tools we need
let express  = require('express');
let app      = express();
let port     = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient // same but lower level nad write in mong
const { ObjectID } = require('mongodb')
let mongoose = require('mongoose'); // ORM object relation mapper it maps objects in your languages(class in js etc) to their document (nicer version and easier to write)
let passport = require('passport');
let flash    = require('connect-flash');// it is a middlewear and is part of the session to keep things from redirection <-- lookup
let morgan       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');// automatically included w/express - line not needed
let session      = require('express-session');//usually a json file and the sesson keeps you logged in for a period of time

let configDB = require('./config/database.js');
 
let db 

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
//this is a function and the callback is the second p
/* const lilFunction = require('./app/routes.js')
lilfunction(app, passport, db) */  
require('./app/routes.js')(app, passport, db, ObjectID);//<--
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')) //anything in this folder we dont hae to call the entire file path but we can just call the name


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
//used for managing session info on an express object
//changes propogates on express objects
//
app.use(session({
    secret: 'rcbootcamp2021b', // session secret
    resave: true,
    saveUninitialized: true
}));
//requests are ephemral
app.use(passport.initialize());// this is why you need to be-initalized on  each request
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
