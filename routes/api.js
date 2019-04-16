/*
 |--------------------------------------------------------------------------
 | Setup
 |--------------------------------------------------------------------------
 */
	// Node Modules
 	const NJWT = require( 'njwt' );
	const JWTDecode = require( 'jwt-decode' );
	const RoutesVersioning = require( 'express-routes-versioning' )();

	// Controllers
	const Controllers = {
		v_1_0: {
			EBCCValidationDetail: require( _directory_base + '/app/controllers/v1.0/EBCCValidationDetailController.js' ),
			EBCCValidationHeader: require( _directory_base + '/app/controllers/v1.0/EBCCValidationHeaderController.js' ),
			Kualitas: require( _directory_base + '/app/controllers/v1.0/KualitasController.js' ),
			Report: require( _directory_base + '/app/controllers/v1.0/ReportController.js' )
		}
	}
/*
 |--------------------------------------------------------------------------
 | Routing
 |--------------------------------------------------------------------------
 */
	module.exports = ( app ) => {

		/*
		 |--------------------------------------------------------------------------
		 | Welcome Message
		 |--------------------------------------------------------------------------
		 */
			app.get( '/', ( req, res ) => {
				res.json( { 
					application: {
						name : config.name,
						port : config.port,
						environment : config.env
					} 
				} )
			} );

		/*
		 |--------------------------------------------------------------------------
		 | EBCC Validation Detail
		 |--------------------------------------------------------------------------
		 */
			app.post( '/ebcc/validation/detail', verifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.EBCCValidationDetail.create
			} ) );

		/*
		 |--------------------------------------------------------------------------
		 | EBCC Validation Header
		 |--------------------------------------------------------------------------
		 */
		 	app.post( '/ebcc/validation/header', verifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.EBCCValidationHeader.create_v_1_0
			} ) );

		/*
		 |--------------------------------------------------------------------------
		 | Kualitas
		 |--------------------------------------------------------------------------
		 */
			app.get( '/ebcc/kualitas', verifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.Kualitas.find_v_1_0
			} ) );

			app.post( '/ebcc/kualitas', verifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.Kualitas.create_v_1_0
			} ) );

			app.post( '/sync-tap/kualitas', verifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.Kualitas.create_or_update_v_1_0
			} ) );

			app.get( '/sync-mobile/kualitas/:start_date/:end_date', verifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.Kualitas.sync_mobile_v_1_0
			} ) );

		/*
		 |--------------------------------------------------------------------------
		 | Report
		 |--------------------------------------------------------------------------
		 */
			app.get( '/report/web/per-baris/:werks_afd_block_code/:start_date/:end_date', verifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.Report.web_report_per_baris_v_1_0
			} ) );
	}

/*
 |--------------------------------------------------------------------------
 | Verify Token
 |--------------------------------------------------------------------------
 */
	function verifyToken( req, res, next ) {
		// Get auth header value
		const bearer_header = req.headers['authorization'];
		if ( typeof bearer_header !== 'undefined' ) {
			const bearer = bearer_header.split( ' ' );
			const bearer_token = bearer[1];
			req.token = bearer_token;
			NJWT.verify( bearer_token, config.app.secret_key, config.app.token_algorithm, ( err, authData ) => {
				if ( err ) {
					res.send({
						status: false,
						message: "Invalid Token",
						data: []
					} );
				}
				else {
					req.auth = JWTDecode( req.token );
					req.auth.LOCATION_CODE_GROUP = req.auth.LOCATION_CODE.split( ',' );
					req.config = config;
					next();
				}
			} );
		}
		else {
			// Forbidden
			res.sendStatus( 403 );
		}
	}