/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
 	const EBCCValidationDetailModel = require( _directory_base + '/app/v1.0/Http/Models/EBCCValidationDetailModel.js' );

	// Modules
	const validator = require( 'ferds-validator');

/*
 |--------------------------------------------------------------------------
 | Versi 1.0
 |--------------------------------------------------------------------------
 */
 	/** 
 	  * Create
	  * @desc Untuk membuat data baru.
	  * @return json
	  * --------------------------------------------------------------------
	*/
	 	exports.create = ( req, res ) => {
	 		var rules = [
	 			{
					"name": "EBCC_VALIDATION_CODE",
					"value": req.body.EBCC_VALIDATION_CODE,
					"rules": "required|alpha_numeric"
				},
				{
					"name": "ID_KUALITAS",
					"value": req.body.ID_KUALITAS,
					"rules": "required|numeric"
				},
				{
					"name": "JUMLAH",
					"value": req.body.JUMLAH.toString(),
					"rules": "required|numeric"
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
				},
				{
					"name": "STATUS_SYNC",
					"value": req.body.STATUS_SYNC,
					"rules": "required|alpha"
				},
				{
					"name": "SYNC_TIME",
					"value": req.body.SYNC_TIME.toString(),
					"rules": "required|exact_length(14)|numeric"
				}
			];
			var run_validator = validator.run( rules );
			console.log( run_validator.error_lists );

			if ( run_validator.status == true ) {
		 		var auth = req.auth;
		 		var postdata = new EBCCValidationDetailModel( {
		 			EBCC_VALIDATION_CODE: req.body.EBCC_VALIDATION_CODE,
					ID_KUALITAS: req.body.ID_KUALITAS,
					JUMLAH: req.body.JUMLAH,
					INSERT_USER: req.body.INSERT_USER || "",
					INSERT_TIME: req.body.INSERT_TIME || 0,
					STATUS_SYNC: req.body.STATUS_SYNC || "",
					SYNC_TIME: req.body.SYNC_TIME || 0,
					UPDATE_USER: req.body.UPDATE_USER || "",
					UPDATE_TIME: req.body.UPDATE_TIME || 0
		 		} );

		 		postdata.save()
				.then( data => {
					if ( !data ) {
						return res.send( {
							status: false,
							message: "Error! Terjadi kesalahan, data tidak diproses.",
							data: {}
						} );
					}
					res.send( {
						status: true,
						message: "Success!",
						data: {}
					} );
				} ).catch( err => {
					res.send( {
						status: false,
						message: "Error! Data gagal diproses.",
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