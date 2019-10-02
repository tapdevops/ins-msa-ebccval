/*
|--------------------------------------------------------------------------
| Global APP Init
|--------------------------------------------------------------------------
*/
	global._directory_base = __dirname;
	global.config = {};
		  config.app = require( './config/app.js' );
		  config.database = require( './config/database.js' )[config.app.env];

/*
|--------------------------------------------------------------------------
| APP Setup
|--------------------------------------------------------------------------
*/
	// Node Modules
	const BodyParser = require( 'body-parser' );
	const Express = require( 'express' );
	const Mongoose = require( 'mongoose' );
	const NodeCron = require( 'node-cron' );

	//Models
	const Kernel = require( _directory_base + '/app/v1.1/Http/Console/Kernel.js' );

	// Primary Variable
	const App = Express();

	//Library
	const Security = require( _directory_base + '/app/v1.1/Http/Libraries/Security.js' )


/*
|--------------------------------------------------------------------------
| APP Init
|--------------------------------------------------------------------------
*/
	// Parse request of content-type - application/x-www-form-urlencoded
	App.use( BodyParser.urlencoded( { extended: false } ) );

	// Parse request of content-type - application/json
	App.use( BodyParser.json() );

	// Setup Database
	Mongoose.Promise = global.Promise;
	Mongoose.connect( config.database.url, {
		useNewUrlParser: true,
		ssl: config.database.ssl
	} ).then( () => {
		console.log( "DB Status \t: Connected " + " (" + config.app.env + ")" );
	} ).catch( err => {
		console.log( "DB Status \t: Connected " + " (" + config.app.env + ")" );
	} );

	//scheduling job_update_transaksi_complete() with cron 
	NodeCron.schedule( '5 0 * * SUN', async () => {
		let claims = {
			USERNAME: "sentot.santosa",
			USER_AUTH_CODE: "TAC00011",
			LOCATION_CODE: "63,64,43"
		}
		let token = Security.generate_token( claims );
		Kernel.job_update_transaksi_complete( token );
		console.log( "running node-cron..." );
	} )

	// Server Running Message
	App.listen( parseInt( config.app.port[config.app.env] ), () => {
		console.log( "App Name\t: " + config.app.name );
		console.log( "App Port\t: " + config.app.port[config.app.env] );
	} );

/*
|--------------------------------------------------------------------------
| Kafka Setup
|--------------------------------------------------------------------------
*/
	// As Kafka Producer
	// Libraries.KafkaServer.consumer();

/*
|--------------------------------------------------------------------------
| Request
|--------------------------------------------------------------------------
*/
	require( './routes/api.js' )( App );

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/
	module.exports = App;