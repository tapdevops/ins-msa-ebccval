/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const EBCCValidationHeaderModel = require( _directory_base + '/app/v2.0/Http/Models/EBCCValidationHeaderModel.js' );
	const EBCCValidationDetailModel = require( _directory_base + '/app/v2.0/Http/Models/EBCCValidationDetailModel.js' );

	// Modules
	const Validator = require( 'ferds-validator');

/*
 |--------------------------------------------------------------------------
 | Versi 1.1
 |--------------------------------------------------------------------------
 */
 	/** 
 	  * Web Report Per Baris
	  * @desc Untuk mengambil data report per baris
	  * @return json
	  * --------------------------------------------------------------------
	*/
	exports.web_report_per_baris = async ( req, res ) => {
		var start_date = parseInt( req.params.start_date + "000000" );
		var end_date = parseInt( req.params.end_date + "235959" );
		var end_date = parseInt( req.params.end_date + "235959" );
		var type = ( req.params.type == 'mill' ? 'M' : 'V' );
		var query = await EBCCValidationHeaderModel.aggregate( [
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
					"EBCC_VALIDATION_CODE": new RegExp( type ),
					"WERKS": new RegExp( req.params.werks ),
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
		] );
		return res.json( {
			status: true,
			message: "Success!",
			data: query
		} );
	}