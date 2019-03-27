/*
|--------------------------------------------------------------------------
| APP Setup
|--------------------------------------------------------------------------
*/
	// Node Modules
	const BodyParser = require( 'body-parser' );
	const Express = require( 'express' );
	const Mongoose = require( 'mongoose' );

	// Primary Variable
	const app = Express();

/*
|--------------------------------------------------------------------------
| Global APP Init
|--------------------------------------------------------------------------
*/
	global._directory_base = __dirname;
	global._directory_root = '';
	global.config = {};
		   config.app = require( _directory_base + '/config/app.js' );
		   config.database = require( _directory_base + '/config/database.js' )[config.app.env];

		  

/*
|--------------------------------------------------------------------------
| APP Init
|--------------------------------------------------------------------------
*/
	// Parse request of content-type - application/x-www-form-urlencoded
	app.use( BodyParser.urlencoded( { pextended: false } ) );

	// Parse request of content-type - application/json
	app.use( BodyParser.json() );

	// Setup Database
	Mongoose.Promise = global.Promise;
	Mongoose.connect( config.database.url, {
		useNewUrlParser: true,
		ssl: config.database.ssl
	} ).then( () => {
		console.log( 'Database connected!' );
	} ).catch( err => {
		console.log( 'Could not connect to the Database. Exiting application.' );
	} );
	
	// Server Running Message
	app.listen( config.app.port, () => {
		console.log( 'Server ' + config.app.name + ' Berjalan di port ' + config.app.port );
	} );

	// Routing API
	require( './routes/api.js' )( app );

	module.exports = app;