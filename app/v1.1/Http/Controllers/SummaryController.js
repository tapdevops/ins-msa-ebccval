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
 	const NodeRestClient = require( 'node-rest-client' ).Client;

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
 		var ebcc_query = await SummaryWeeklyModel.aggregate( [
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

		if ( ebcc_query.length == 0 ) {
			var now = HelperLib.date_format( 'now', 'YYYYMMDDhhmmss' );
			var set = new SummaryWeeklyModel( {
				"TOTAL_EBCC": 0,
				"TARGET_EBCC": 0,
				"SUMMARY_DATE": parseInt( now.toString().substr( 0, 8 ) ),
				"IS_VIEW": 0, 
				"INSERT_USER": req.auth.USER_AUTH_CODE, // Hardcode
				"INSERT_TIME": now
			} );
			set.save();
		}
 		return res.status( 200 ).json( {
 			status: ( ebcc_query.length > 0 ? ( ebcc_query[0].IS_VIEW == 1 ? false : true ) : true ),
 			message: "OK",
 			data: {
 				jumlah: ( ebcc_query.length > 0 ? ebcc_query[0].TOTAL_EBCC : 0 ),
 				target: ( ebcc_query.length > 0 ? ebcc_query[0].TARGET_EBCC : 0 ),
 			}
 		} );
	};

	/** 
 	  * Generate EBCC
	  * Untuk memberi data summary EBCC Validation
	  * --------------------------------------------------------------------
	*/
	exports.process_weekly = async ( req, res ) => {
		var url = {
 			user_data: config.app.url[config.app.env].microservice_auth + '/api/v1.1/user/data',
 			time_daily: config.app.url[config.app.env].ldap_2 + '/dw/time-daily/get-active-date-min-7',
 			jumlah_krani_buah: config.app.url[config.app.env].ldap_2 + '/dw/employee-sap/get-krani-buah'
 		};
		var args = {
			headers: { 
				"Content-Type": "application/json",
				"Authorization": "Bearer " + req.token 
			}
		};
		var authCode = req.auth.USER_AUTH_CODE;
		var date_now = new Date();
			date_now = parseInt( MomentTimezone( date_now ).tz( "Asia/Jakarta" ).format( "YYYYMMDD" ) + '235959' );
		var date_min_1_week = new Date();
			date_min_1_week.setDate( date_min_1_week.getDate() - 7 );
			date_min_1_week = parseInt( MomentTimezone( date_min_1_week ).tz( "Asia/Jakarta" ).format( "YYYYMMDD" ) + '000000' );
		var max_date = parseInt( MomentTimezone( date_now ).tz( "Asia/Jakarta" ).format( "YYYYMMDD" ) + '235959' );
	
		( new NodeRestClient() ).get( url.user_data, args, async function ( data, response ) {
			console.log( data.status );
			if ( data.status == true ) {
				data = data.data;

				data.forEach( async function( dt ) {
					var authCode = dt.USER_AUTH_CODE;
					var ebcc = await EBCCValidationHeaderModel.aggregate( [
						{
					        $match: {
					            INSERT_USER: dt.USER_AUTH_CODE,
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
					var location_code = dt.LOCATION_CODE.split( ',' );

					console.log(location_code);
					if ( location_code.length > 0 ) {
						if ( dt.USER_ROLE == 'ASISTEN_LAPANGAN' ) {
							var ba_code = location_code[0].substr( 0, 4 );
							var url_ldap = url.time_daily + '/' + ba_code;
							var args_ldap = {
								headers: { 
									"Content-Type": "application/json" 
								}
							};
							
							( new NodeRestClient() ).get( url_ldap, args_ldap, function ( time_data, time_response ) {
								var jumlah_daily = parseInt( time_data.data.results.jumlah_hari );
								var url_krani_buah = url.jumlah_krani_buah + '/' + dt.LOCATION_CODE;
								var args_krani_buah = {
									headers: { 
										"Content-Type": "application/json" 
									}
								};

								( new NodeRestClient() ).get( url_krani_buah, args_krani_buah, function ( krani_data, krani_response ) {
									var target_ebcc = ( 5 * jumlah_daily * parseInt( krani_data.data.results.jumlah_krani_buah ) );
									SummaryWeeklyModel.findOne( {
										INSERT_USER: authCode,
										SUMMARY_DATE: parseInt( date_now.toString().substr( 0, 8 ) )
									} ).then( dt_ebcc => {
										if ( !dt_ebcc ) {
											var set = new SummaryWeeklyModel( {
												"TOTAL_EBCC": ( ebcc.length > 0 ? ebcc[0].count : 0 ),
												"TARGET_EBCC": ( target_ebcc ? target_ebcc : 0),
												"SUMMARY_DATE": parseInt( date_now.toString().substr( 0, 8 ) ),
												"IS_VIEW": 0,
												"INSERT_USER": authCode,
												"INSERT_TIME": HelperLib.date_format( 'now', 'YYYYMMDDhhmmss' )
											} );
											set.save()
										}
									} );
								} );
							} );
						}
						else {
							SummaryWeeklyModel.findOne( {
								INSERT_USER: authCode,
								SUMMARY_DATE: parseInt( date_now.toString().substr( 0, 8 ) )
							} ).then( dt_ebcc => {
								if ( !dt_ebcc ) {
									var set = new SummaryWeeklyModel( {
										"TOTAL_EBCC": ( ebcc.length > 0 ? ebcc[0].count : 0 ),
										"TARGET_EBCC": 0,
										"SUMMARY_DATE": parseInt( date_now.toString().substr( 0, 8 ) ),
										"IS_VIEW": 0,
										"INSERT_USER": authCode,
										"INSERT_TIME": HelperLib.date_format( 'now', 'YYYYMMDDhhmmss' )
									} );
									set.save()
								}
							} );
						}
					}
				} );
			}
		} );	
		return res.json( {
			status: true,
			message: "Success!",
			data: {}
		} );
		
	};