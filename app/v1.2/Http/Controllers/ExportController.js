/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
 	const EBCCValidationDetailModel = require( _directory_base + '/app/v1.2/Http/Models/EBCCValidationDetailModel.js' );
 	const EBCCValidationHeaderModel = require( _directory_base + '/app/v1.2/Http/Models/EBCCValidationHeaderModel.js' );

/*
 |--------------------------------------------------------------------------
 | Versi 1.1
 |--------------------------------------------------------------------------
 */
 	/** 
 	  * EBCC Validation Header
 	  *
 	  * Memasukkan data ke TR_EBCC (Oracle TAP)
	  * --------------------------------------------------------------------
	*/
		exports.tr_ebcc_kualitas = async ( req, res ) => {
			let type = req.params.type;
			var data = await EBCCValidationDetailModel.aggregate( [
				{
					"$lookup": {
						"from": "TR_H_EBCC_VALIDATION",
						"localField": "EBCC_VALIDATION_CODE",
						"foreignField": "EBCC_VALIDATION_CODE",
						"as": "HEADER"
					}
				},
				{
					"$addFields": {
						"WERKS": { "$arrayElemAt": [ "$HEADER.WERKS", 0 ] },
						"AFD_CODE": { "$arrayElemAt": [ "$HEADER.AFD_CODE", 0 ] },
						"BLOCK_CODE": { "$arrayElemAt": [ "$HEADER.BLOCK_CODE", 0 ] },
						"TPH_CODE": { "$arrayElemAt": [ "$HEADER.NO_TPH", 0 ] },
						"DELIVERY_TICKET": { "$arrayElemAt": [ "$HEADER.DELIVERY_CODE", 0 ] },
					}
				},
				{
					"$project": {
						"_id": 0,
						"__v": 0,
						"HEADER": 0
					}
				},
				// mill estate
				{
					"$match": {
						"EBCC_VALIDATION_CODE": type == "estate" ? /^V/ : type == "mill" ? /^M/ : null,
						"SYNC_TIME": {
							"$gte": parseInt( req.params.start_date ),
							"$lte": parseInt( req.params.end_date )
						}
					}
				}
			] );
			console.log( data.length );
			return res.status( 200 ).json( {
				status: true,
				message: "Success!",
				data: data
			} );
		};
	
 	/** 
 	  * EBCC Validation Header
 	  *
 	  * Memasukkan data ke TR_EBCC (Oracle TAP)
	  * --------------------------------------------------------------------
	*/
		exports.tr_ebcc = async ( req, res ) => {
			var type = req.params.type;
			var data = await EBCCValidationHeaderModel.aggregate( [
				{
					"$project": {
						"_id": 0,
						"__v": 0
					}
				},
				{
					"$match": {
						"EBCC_VALIDATION_CODE": type == "estate" ? /^V/ : type == "mill" ? /^M/ : null,
						"SYNC_TIME": {
							"$gte": parseInt( req.params.start_date ),
							"$lte": parseInt( req.params.end_date ) 
						}
					}
				}
			] );
			return res.status( 200 ).json( {
				status: true,
				message: "Success!",
				data: data
			} );
		};