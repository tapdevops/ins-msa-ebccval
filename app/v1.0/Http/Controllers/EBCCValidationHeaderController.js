/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
 	const EBCCValidationHeaderModel = require( _directory_base + '/app/v1.0/Http/Models/EBCCValidationHeaderModel.js' );

	// Modules
	const Validator = require( 'ferds-validator');

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
					"name": "LAT_TPH",
					"value": parseFloat( req.body.LAT_TPH ),
					"rules": "required|latitude"
				},
				{
					"name": "LON_TPH",
					"value": parseFloat( req.body.LON_TPH ),
					"rules": "required|longitude"
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
			var run_validator = Validator.run( rules );
			
			if ( run_validator.status == true ) {
		 		var auth = req.auth;
		 		var postdata = new EBCCValidationHeaderModel( {
		 			EBCC_VALIDATION_CODE: req.body.EBCC_VALIDATION_CODE,
					WERKS: req.body.WERKS,
					AFD_CODE: req.body.AFD_CODE,
					BLOCK_CODE: req.body.BLOCK_CODE,
					NO_TPH: req.body.NO_TPH,
					STATUS_TPH_SCAN: req.body.STATUS_TPH_SCAN,
					ALASAN_MANUAL: req.body.ALASAN_MANUAL || "",
					LAT_TPH: req.body.LAT_TPH,
					LON_TPH: req.body.LON_TPH,
					DELIVERY_CODE: req.body.DELIVERY_CODE,
					STATUS_DELIVERY_CODE: req.body.STATUS_DELIVERY_CODE,
					INSERT_USER: req.body.INSERT_USER,
					INSERT_TIME: req.body.INSERT_TIME,
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