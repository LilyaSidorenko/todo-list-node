var express  = require('express');
var app      = express();
var port     = process.env.PORT || 4000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
const dotenv = require('dotenv');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
dotenv.load({ path: '.env' });

mongoose.connect(process.env.MONGODB_URI);

require('./config/passport')(passport);

app.use(morgan('dev'));
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

require('./app/routes/user.js')(app, passport);
require('./app/routes/home-tasks.js')(app, passport);
require('./app/routes/work-tasks.js')(app, passport);

app.listen(port);
console.log('localhost:' + port);
