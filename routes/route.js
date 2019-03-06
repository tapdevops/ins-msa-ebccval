/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Libraries
 	const config = require( '../config/config.js' );
 	// Node Modules
	const jwt = require( 'jsonwebtoken' );
	const jwtDecode = require( 'jwt-decode' );
	const nJwt = require( 'njwt' );
	const uuid = require( 'uuid' );
	
/*
 |--------------------------------------------------------------------------
 | Controller
 |--------------------------------------------------------------------------
 */
 	const EBCCValidationDetailController = require( '../app/controllers/EBCCValidationDetailController.js' );
 	const EBCCValidationHeaderController = require( '../app/controllers/EBCCValidationHeaderController.js' );
 	const KualitasController = require( '../app/controllers/KualitasController.js' );
 	

/*
 |--------------------------------------------------------------------------
 | Routing
 |--------------------------------------------------------------------------
 */
	module.exports = ( app ) => {

		/*
		 |--------------------------------------------------------------------------
		 | EBCC Validation Detail
		 |--------------------------------------------------------------------------
		 */
			app.post( '/ebcc/validation/detail', token_verify, EBCCValidationDetailController.create );

		/*
		 |--------------------------------------------------------------------------
		 | EBCC Validation Header
		 |--------------------------------------------------------------------------
		 */
			app.post( '/ebcc/validation/header', token_verify, EBCCValidationHeaderController.create );
			

		/*
		 |--------------------------------------------------------------------------
		 | Kualitas
		 |--------------------------------------------------------------------------
		 */
			app.get( '/ebcc/kualitas', token_verify, KualitasController.find );
			app.post( '/ebcc/kualitas', token_verify, KualitasController.create );
			app.post( '/sync-tap/kualitas', token_verify, KualitasController.createOrUpdate );
			app.get( '/sync-mobile/kualitas/:start_date/:end_date', token_verify, KualitasController.syncMobile );
	}

/*
 |--------------------------------------------------------------------------
 | Token Verify
 |--------------------------------------------------------------------------
 */
	function token_verify( req, res, next ) {
		const bearerHeader = req.headers['authorization'];
		if ( typeof bearerHeader !== 'undefined' ) {
			const bearer = bearerHeader.split( ' ' );
			const bearer_token = bearer[1];
			req.token = bearer_token;
			nJwt.verify( bearer_token, config.secret_key, config.token_algorithm, ( err, authData ) => {
				if ( err ) {
					res.send({
						status: false,
						message: "Invalid Token",
						data: []
					} );
				}
				else {
					req.auth = jwtDecode( req.token );
					req.auth.LOCATION_CODE_GROUP = req.auth.LOCATION_CODE.split( ',' );
					req.config = config;
					next();
				}
			} );
		}
		else {
			res.sendStatus( 403 );
		}
	}