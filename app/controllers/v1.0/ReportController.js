/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const EBCCValidationHeaderModel = require( _directory_base + '/app/models/v1.0/EBCCValidationHeaderModel.js' );
	const EBCCValidationDetailModel = require( _directory_base + '/app/models/v1.0/EBCCValidationDetailModel.js' );

	// Modules
	const Validator = require( 'ferds-validator');

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
		var start_date = parseInt( req.params.start_date + "000000" );
		var end_date = parseInt( req.params.end_date + "235959" );
		var query = await EBCCValidationHeaderModel.aggregate([
			{
				"$lookup": {
					"from": "TR_D_EBCC_VALIDATION",
					"localField": "EBCC_VALIDATION_CODE",
					"foreignField": "EBCC_VALIDATION_CODE",
					"as": "DETAIL"
				}
			},
			{
				"$match": {
					"WERKS_AFD_BLOCK_CODE": new RegExp( '^' + req.params.werks_afd_block_code ),
					"$and": [
						{
							"INSERT_TIME": {
								"$gte": start_date,
								"$lte": end_date
							}
						}
					]
				}
			}
		]);
		res.json( {
			status: true,
			message: "Success!",
			data: query
		} );
	}