const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const uuid = require('uuid');
const config = require('../../config/appconfig.js');
const Logger = require('../../utils/logger.js');
var passport = require('passport');
var session = require('express-session');

const Sequelize = require("sequelize")
//Models 
var Models = require("../models/init-models.js");

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
	host: config.db.host,
	dialect: 'mysql',
	operatorsAliases: false,
  
	pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
	},
  });

var models = Models.initModels(sequelize);

const logger = new Logger();
const app = express();
app.set('config', config); // the system configrationsx
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(compression());
app.use(cors());

// For Passport 
app.use(session({
	secret: 'shouldIwritethesecretintoanenvfileorconfigfile?',
	resave: true, 
	saveUninitialized:true
	})); // session secret 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


const swagger = require('../../utils/swagger.js');


process.on('SIGINT', () => {
	logger.log('stopping the server', 'info');
	process.exit();
});

app.use(express.urlencoded({
	extended: true 
	})
);
app.use(express.json());

app.set('port', process.env.DEV_APP_PORT);
app.use('/api/docs', swagger.router);

app.use((req, res, next) => {
	req.identifier = uuid();
	const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
	logger.log(logString, 'info');
	next();
});

app.use(require('../../router/index.js'));

require('../../config/passport/passport.js')(passport, models.tbl_users);

//Sync Database 
sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});

/*
app.use((req, res, next) => {
	console.log(req)
	logger.log('the url you are trying to reach is not hosted on our server', 'error');
	const err = new Error('Not Found');
	err.status = 404;
	res.status(err.status).json({ type: 'error', message: 'the url you are trying to reach is not hosted on our server' });
	next(err);
});
*/
module.exports.Models = models;
module.exports = app;
