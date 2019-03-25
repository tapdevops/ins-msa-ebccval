/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const EBCCValidationHeaderModel = require( _directory_base + '/app/models/EBCCValidationHeaderModel.js' );
	const EBCCValidationDetailModel = require( _directory_base + '/app/models/EBCCValidationDetailModel.js' );

/*
 |--------------------------------------------------------------------------
 | Versi 1.0.0
 |--------------------------------------------------------------------------
 */
 	/** 
 	  * Web Report Per Baris
	  * @desc Untuk mengambil data report per baris
	  * @return json
	  * --------------------------------------------------------------------
	*/
	exports.web_report_per_baris_v_1_0 = async ( req, res ) => {
		var query = await EBCCValidationHeaderModel.aggregate([
			{
				"$lookup": {
					"from": "TR_D_EBCC_VALIDATION",
					"localField": "EBCC_VALIDATION_CODE",
					"foreignField": "EBCC_VALIDATION_CODE",
					"as": "DETAIL"
		        }
		    }
		]);
		res.json( {
			message: "OK",
			auth: req.auth,
			query: query
		} );
	}