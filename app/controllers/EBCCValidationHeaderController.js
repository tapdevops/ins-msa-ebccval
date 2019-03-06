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

/**
 * Create
 * Untuk membuat data baru
 * --------------------------------------------------------------------------
 */
 	exports.create = ( req, res ) => {
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