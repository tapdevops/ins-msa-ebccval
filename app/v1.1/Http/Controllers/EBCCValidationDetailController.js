/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
 	const EBCCValidationDetailModel = require( _directory_base + '/app/v1.1/Http/Models/EBCCValidationDetailModel.js' );

	// Modules
	const validator = require( 'ferds-validator');
	
	// Libraries
	const KafkaServer = require( _directory_base + '/app/v1.1/Http/Libraries/KafkaServer.js' );

/*
 |--------------------------------------------------------------------------
 | Versi 1.1
 |--------------------------------------------------------------------------
 */
 	/** 
 	  * Create
	  * @desc Untuk membuat data baru.
	  * @return json
	  * --------------------------------------------------------------------
	*/
	 	exports.create = ( req, res ) => {
			var auth = req.auth;
			var body = {
				EBCC_VALIDATION_CODE: req.body.EBCC_VALIDATION_CODE,
				ID_KUALITAS: req.body.ID_KUALITAS,
				JUMLAH: req.body.JUMLAH,
				INSERT_USER: req.body.INSERT_USER || "",
				INSERT_TIME: req.body.INSERT_TIME || 0,
				STATUS_SYNC: req.body.STATUS_SYNC || "",
				SYNC_TIME: req.body.SYNC_TIME || 0,
				UPDATE_USER: req.body.UPDATE_USER || "",
				UPDATE_TIME: req.body.UPDATE_TIME || 0
			}
		 	var postdata = new EBCCValidationDetailModel( body );

		 	postdata.save()
			.then( data => {
				if ( !data ) {
					return res.send( {
						status: false,
						message: "Error! Terjadi kesalahan, data tidak diproses.",
						data: {}
					} );
				}
				else {
					var kafka_body = {
						EBVTC: req.body.EBCC_VALIDATION_CODE,
						IDKLT: req.body.ID_KUALITAS,
						JML: req.body.JUMLAH,
						INSUR: req.body.INSERT_USER || "",
						INSTM: req.body.INSERT_TIME || 0,
						SSYNC: req.body.STATUS_SYNC || "",
						STIME: req.body.SYNC_TIME || 0,
						UPTUR: req.body.UPDATE_USER || "",
						UPTTM: req.body.UPDATE_TIME || 0
					}
					KafkaServer.producer( 'INS_MSA_EBCCVAL_TR_EBCC_VALIDATION_D', JSON.stringify( kafka_body ) );
				}
				return res.send( {
					status: true,
					message: "Success!",
					data: {}
				} );
			} ).catch( err => {
				console.log(err)
				return res.send( {
					status: false,
					message: "Error! Data gagal diproses.",
					data: {}
				} );
			} );
	 	}