/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
 	const EBCCValidationDetailModel = require( '../models/EBCCValidationDetailModel.js' );
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
 		var postdata = new EBCCValidationDetailModel( {
 			EBCC_VALIDATION_CODE: req.body.EBCC_VALIDATION_CODE,
			ID_KUALITAS: req.body.ID_KUALITAS,
			JUMLAH: req.body.JUMLAH,
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