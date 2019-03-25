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
		v1: {
			EBCCValidationDetail: require( _directory_base + '/app/controllers/v1/EBCCValidationDetailController.js' ),
			EBCCValidationHeader: require( _directory_base + '/app/controllers/v1/EBCCValidationHeaderController.js' ),
			Kualitas: require( _directory_base + '/app/controllers/v1/KualitasController.js' ),
			Report: require( _directory_base + '/app/controllers/v1/ReportController.js' )
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
			app.post( '/ebcc/validation/detail', verify_token, RoutesVersioning( {
				"1.0.0": Controllers.v1.EBCCValidationDetail.create_v_1_0
			} ) );

		/*
		 |--------------------------------------------------------------------------
		 | EBCC Validation Header
		 |--------------------------------------------------------------------------
		 */
		 	app.post( '/ebcc/validation/header', verify_token, RoutesVersioning( {
				"1.0.0": Controllers.v1.EBCCValidationHeader.create_v_1_0
			} ) );

		/*
		 |--------------------------------------------------------------------------
		 | Kualitas
		 |--------------------------------------------------------------------------
		 */
			app.get( '/ebcc/kualitas', verify_token, RoutesVersioning( {
				"1.0.0": Controllers.v1.Kualitas.find_v_1_0
			} ) );

			app.post( '/ebcc/kualitas', verify_token, RoutesVersioning( {
				"1.0.0": Controllers.v1.Kualitas.create_v_1_0
			} ) );

			app.post( '/sync-tap/kualitas', verify_token, RoutesVersioning( {
				"1.0.0": Controllers.v1.Kualitas.create_or_update_v_1_0
			} ) );

			app.get( '/sync-mobile/kualitas/:start_date/:end_date', verify_token, RoutesVersioning( {
				"1.0.0": Controllers.v1.Kualitas.sync_mobile_v_1_0
			} ) );

		/*
		 |--------------------------------------------------------------------------
		 | Report
		 |--------------------------------------------------------------------------
		 */
			app.get( '/report/web/per-baris', verify_token, RoutesVersioning( {
				"1.0.0": Controllers.v1.Report.web_report_per_baris_v_1_0
			} ) );
	}

/*
 |--------------------------------------------------------------------------
 | Verify Token
 |--------------------------------------------------------------------------
 */
	function verify_token( req, res, next ) {
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
				req.auth = JWTDecode( req.token );
				req.auth.LOCATION_CODE_GROUP = req.auth.LOCATION_CODE.split( ',' );
				req.config = config;
				next();
			} );
		}
		else {
			res.sendStatus( 403 );
		}
	}