/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
 	const EBCCValidationHeaderModel = require( '../models/EBCCValidationHeaderModel.js' );

	// Libraries
	const config = require( '../../config/config.js' );
	const date = require( '../libraries/date' );

	// Modules
	const validator = require( 'ferds-validator');

/**
 * Create
 * Untuk membuat data baru
 * --------------------------------------------------------------------------
 */
 	exports.create = ( req, res ) => {
 		var rules = [
 			{
				"name": "EBCC_VALIDATION_CODE",
				"value": req.body.EBCC_VALIDATION_CODE,
				"rules": "required|alpha_numeric"
			},
			{
				"name": "WERKS",
				"value": req.body.WERKS,
				"rules": "required|numeric"
			},
			{
				"name": "AFD_CODE",
				"value": req.body.AFD_CODE,
				"rules": "required|alpha_numeric"
			},
			{
				"name": "BLOCK_CODE",
				"value": req.body.BLOCK_CODE,
				"rules": "required|alpha_numeric"
			},
			{
				"name": "NO_TPH",
				"value": req.body.NO_TPH,
				"rules": "required|alpha_numeric"
			},
			{
				"name": "STATUS_TPH_SCAN",
				"value": req.body.STATUS_TPH_SCAN,
				"rules": "required|alpha"
			},
			{
				"name": "DELIVERY_CODE",
				"value": req.body.DELIVERY_CODE,
				"rules": "required"
			},
			{
				"name": "STATUS_DELIVERY_CODE",
				"value": req.body.STATUS_DELIVERY_CODE,
				"rules": "required"
			},
			{
				"name": "INSERT_USER",
				"value": req.body.INSERT_USER,
				"rules": "required|alpha_numeric"
			},
			{
				"name": "INSERT_TIME",
				"value": req.body.INSERT_TIME.toString(),
				"rules": "required|exact_length(14)|numeric"
			}
		];
		var run_validator = validator.run( rules );
		console.log( run_validator.error_lists );

		if ( run_validator.status == true ) {
	 		var auth = req.auth;
	 		var postdata = new EBCCValidationHeaderModel( {
	 			EBCC_VALIDATION_CODE: req.body.EBCC_VALIDATION_CODE,
				WERKS: req.body.WERKS,
				AFD_CODE: req.body.AFD_CODE,
				BLOCK_CODE: req.body.BLOCK_CODE,
				NO_TPH: req.body.NO_TPH,
				STATUS_TPH_SCAN: req.body.STATUS_TPH_SCAN,
				DELIVERY_CODE: req.body.DELIVERY_CODE,
				STATUS_DELIVERY_CODE: req.body.STATUS_DELIVERY_CODE,
				INSERT_USER: req.body.INSERT_USER,
				INSERT_TIME: req.body.INSERT_TIME,
				UPDATE_USER: req.body.UPDATE_USER,
				UPDATE_TIME: req.body.UPDATE_TIME,
				DELETE_USER: req.body.DELETE_USER,
				DELETE_TIME: req.body.DELETE_TIME
	 		} );

	 		postdata.save()
			.then( data => {
				if ( !data ) {
					return res.send( {
						status: false,
						message: config.error_message.create_404,
						data: {}
					} );
				}
				res.send( {
					status: true,
					message: config.error_message.create_200,
					data: {}
				} );
			} ).catch( err => {
				res.send( {
					status: false,
					message: config.error_message.create_500,
					data: {}
				} );
			} );
		}
		else {
			res.send( {
				status: false,
				message: "Data gagal diinput, periksa kembali inputan.",
				data: {}
			} );
		}
 	}