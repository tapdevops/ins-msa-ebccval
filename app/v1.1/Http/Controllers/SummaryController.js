/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
 	const EBCCValidationHeaderModel = require( _directory_base + '/app/v1.1/Http/Models/EBCCValidationHeaderModel.js' );
 	const KualitasModel = require( _directory_base + '/app/v1.1/Http/Models/KualitasModel.js' );
	const SummaryWeeklyModel = require( _directory_base + '/app/v1.1/Http/Models/SummaryWeeklyModel.js' );
 	// Node Modules
 	const MomentTimezone = require( 'moment-timezone' );

 	// Libraries
 	const HelperLib = require( _directory_base + '/app/v1.1/Http/Libraries/HelperLib.js' );

/*
 |--------------------------------------------------------------------------
 | Versi 1.1
 |--------------------------------------------------------------------------
 */
	/** 
 	  * EBCC
	  * Untuk memberi data summary EBCC Validation
	  * --------------------------------------------------------------------
	*/
	exports.ebcc = async ( req, res ) => {
 		var date = new Date();
 			date.setDate( date.getDate() - 1 );
 		var max_date = parseInt( MomentTimezone( date ).tz( "Asia/Jakarta" ).format( "YYYYMMDD" ) + '235959' );
 		var ebcc_query = await EBCCValidationHeaderModel.aggregate( [
 			{
 				"$match": {
 					"INSERT_USER": req.auth.USER_AUTH_CODE
 				}
 			},
 			{
				$sort: {
					SUMMARY_DATE: -1
				}
			},
			{
				$limit: 1
			}
 		] );

		if( req.body.IS_VIEW == 1 ){
			SummaryWeeklyModel.findOneAndUpdate( {
				INSERT_USER: req.auth.USER_AUTH_CODE,
				IS_VIEW : 0	
			},
			{
				IS_VIEW: 1
			},
			{
				new: true
			} ).then( data => {
				console.log( data );
			} )
		}
 		return res.status( 200 ).json( {
 			status: true,
 			message: "OK",
 			data: {
 				jumlah: ( ebcc_query.length > 0 ? ebcc_query[0].jumlah : 0 ) ,
 				target: 0
 			}
 		} );
	};

	/** 
 	  * Generate EBCC
	  * Untuk memberi data summary EBCC Validation
	  * --------------------------------------------------------------------
	*/
	exports.process_weekly = async ( req, res ) => {
		var authCode = req.auth.USER_AUTH_CODE;
		var date_now = new Date();
			date_now = parseInt( MomentTimezone( date_now ).tz( "Asia/Jakarta" ).format( "YYYYMMDD" ) + '235959' );
		var date_min_1_week = new Date();
			date_min_1_week.setDate( date_min_1_week.getDate() - 7 );
			date_min_1_week = parseInt( MomentTimezone( date_min_1_week ).tz( "Asia/Jakarta" ).format( "YYYYMMDD" ) + '000000' );
		var max_date = parseInt( MomentTimezone( date_now ).tz( "Asia/Jakarta" ).format( "YYYYMMDD" ) + '235959' );
		

		var query = await EBCCValidationHeaderModel.aggregate( [
			{
				$match: {
					INSERT_TIME: {
						$gte: date_min_1_week,
						$lte: date_now,
					}
				}
			},
			{
				$group: {
					_id: {
						INSERT_USER: "$INSERT_USER"
					}
				}
			},
			{
				$project: {
					_id: 0,
					USER_AUTH_CODE: "$_id.INSERT_USER"
				}
			}
		] ); 

		if( query.length > 0 ) {
			query.forEach( async function( q ) {

				console.log(q);
				var ebcc = await EBCCValidationHeaderModel.aggregate( [
					{
				        $match: {
				            INSERT_USER: q.USER_AUTH_CODE,
				            INSERT_TIME: {
				                $gte: date_min_1_week,
				                $lte: date_now
				            }
				        }
				    },
				    {
				        $group: {
				            _id: {
				                INSERT_USER: "$INSERT_USER"
				            },
				            count: {
				                $sum: 1
				            }
				        }
				    },

				] );

				
				SummaryWeeklyModel.findOne( {
					INSERT_USER: q.USER_AUTH_CODE,
					SUMMARY_DATE: parseInt( date_now.toString().substr( 0, 8 ) )
				} ).then( dt => {
					if ( !dt ) {
						var set = new SummaryWeeklyModel( {
							"TOTAL_EBCC": ( ebcc.length > 0 ? ebcc[0].count : 0 ),
							"SUMMARY_DATE": parseInt( date_now.toString().substr( 0, 8 ) ),
							"IS_VIEW": 0,
							"INSERT_USER": q.USER_AUTH_CODE,
							"INSERT_TIME": HelperLib.date_format( 'now', 'YYYYMMDDhhmmss' )
						} );
						set.save()
					}
				} );
				
			} );
		}
		return res.json( {
			status: true,
			message: "Success!",
			data: {}
		} );
		
	};