/*
|--------------------------------------------------------------------------
| Variable
|--------------------------------------------------------------------------
*/
    //Models
    const EBCCValidationHeaderModel = require( _directory_base + '/app/v1.2/Http/Models/EBCCValidationHeaderModel.js' );
 	const KualitasModel = require( _directory_base + '/app/v1.2/Http/Models/KualitasModel.js' );
	const SummaryWeeklyModel = require( _directory_base + '/app/v1.2/Http/Models/SummaryWeeklyModel.js' );
 	// Node Modules
 	const MomentTimezone = require( 'moment-timezone' );
 	const NodeRestClient = require( 'node-rest-client' ).Client;

 	// Libraries
     const HelperLib = require( _directory_base + '/app/v1.2/Http/Libraries/HelperLib.js' );
     
/*
|--------------------------------------------------------------------------
| Kernel
|--------------------------------------------------------------------------
|
| In the past, you may have generated a Cron entry for each task you needed
| to schedule on your server. However, this can quickly become a pain,
| because your task schedule is no longer in source control and you must
| SSH into your server to add additional Cron entries.
|
*/

    class Kernel {
        async job_update_transaksi_complete( token ) {
            var url = {
                user_data: config.app.url[config.app.env].microservice_auth + '/api/v1.2/user/data',
                time_daily: config.app.url[config.app.env].ldap_2 + '/dw/time-daily/get-active-date-min-7',
                jumlah_krani_buah: config.app.url[config.app.env].ldap_2 + '/dw/employee-sap/get-krani-buah'
            };
            var args = {
               headers: { 
                   "Content-Type": "application/json",
                   "Authorization": "Bearer " + token 
               }
           };
        //    var authCode = req.auth.USER_AUTH_CODE;
            var date_now = new Date();
               date_now = parseInt( MomentTimezone( date_now ).tz( "Asia/Jakarta" ).format( "YYYYMMDD" ) + '235959' );
            var date_min_1_week = new Date();
                date_min_1_week.setDate( date_min_1_week.getDate() - 7 );
                date_min_1_week = parseInt( MomentTimezone( date_min_1_week ).tz( "Asia/Jakarta" ).format( "YYYYMMDD" ) + '000000' );
            var max_date = parseInt( MomentTimezone( date_now ).tz( "Asia/Jakarta" ).format( "YYYYMMDD" ) + '235959' );
            var jumlahNumber = 0;
            ( new NodeRestClient() ).get( url.user_data, args, async function ( dataReceived, response ) {
                
                if ( dataReceived.status == true ) {
                    let data = dataReceived.data;
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
                        
                        //convert dt.LOCATION_CODE ke String agar tidak error ketika di split
                        let stringLocationCode = dt.LOCATION_CODE.toString();

                        var location_code = stringLocationCode.split( ',' );
    
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
        }        
    }
    module.exports = new Kernel();