/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
 	const KualitasModel = require( _directory_base + '/app/v1.0/Http/Models/KualitasModel.js' );

 	// Libraries
 	const HelperLib = require( _directory_base + '/app/v1.0/Http/Libraries/HelperLib.js' );

/*
 |--------------------------------------------------------------------------
 | Versi 1.0
 |--------------------------------------------------------------------------
 */
 	/** 
 	  * Sync
	  * Untuk memberi data pada mobile berdasarkan range terakhir melakukan 
	  * synchronize ke server. Contohnya, User A terakhir melakukan sync 
	  * tanggal 26 Maret 2019, dan hari ini, tanggal 30 April 2019, dia kembali 
	  * melakukan sync, maka range data yang diambil adalah mulai dari tanggal 
	  * 26 Maret 2019 sampai dengan 30 April 2019.
	  * --------------------------------------------------------------------
	*/
	exports.synchronize = ( req, res ) => {
		var auth = req.auth;
		var start_date = parseInt( req.params.start_date + "000000" );
		var end_date = parseInt( req.params.end_date + "235959" );
		
		KualitasModel.find( 
			{
				$or: [
						{
						INSERT_TIME: {
							$gte: start_date,
							$lte: end_date
						}
					},
					{
						UPDATE_TIME: {
							$gte: start_date,
							$lte: end_date
						}
					},
					{
						DELETE_TIME: {
							$gte: start_date,
							$lte: end_date
						}
					}
				]
			}
		)
		.select( {
			_id: 0,
			ID_KUALITAS: 1,
			NAMA_KUALITAS: 1,
			UOM: 1,
			GROUP_KUALITAS: 1,
			ACTIVE_STATUS: 1,
			PENALTY_STATUS: 1,
			SHORT_NAME: 1,
			INSERT_TIME : 1,
			UPDATE_TIME : 1,
			DELETE_TIME : 1,
		} )
		.then( data => {
			var temp_insert = [];
			var temp_update = [];
			var temp_delete = [];
			data.forEach( function( dt ) {
				if ( dt.DELETE_TIME >= start_date && dt.DELETE_TIME <= end_date ) {
					temp_delete.push( {
						ID_KUALITAS: dt.ID_KUALITAS,
						NAMA_KUALITAS: dt.NAMA_KUALITAS,
						UOM: dt.UOM,
						GROUP_KUALITAS: dt.GROUP_KUALITAS,
							ACTIVE_STATUS: dt.ACTIVE_STATUS,
						PENALTY_STATUS: dt.PENALTY_STATUS,
						SHORT_NAME: dt.SHORT_NAME
						} );
				}

				if ( dt.INSERT_TIME >= start_date && dt.INSERT_TIME <= end_date ) {
					temp_insert.push( {
						ID_KUALITAS: dt.ID_KUALITAS,
						NAMA_KUALITAS: dt.NAMA_KUALITAS,
						UOM: dt.UOM,
						GROUP_KUALITAS: dt.GROUP_KUALITAS,
						ACTIVE_STATUS: dt.ACTIVE_STATUS,
						PENALTY_STATUS: dt.PENALTY_STATUS,
						SHORT_NAME: dt.SHORT_NAME
					} );
				}

				if ( dt.UPDATE_TIME >= start_date && dt.UPDATE_TIME <= end_date ) {
					temp_update.push( {
						ID_KUALITAS: dt.ID_KUALITAS,
						NAMA_KUALITAS: dt.NAMA_KUALITAS,
						UOM: dt.UOM,
						GROUP_KUALITAS: dt.GROUP_KUALITAS,
						ACTIVE_STATUS: dt.ACTIVE_STATUS,
						PENALTY_STATUS: dt.PENALTY_STATUS,
						SHORT_NAME: dt.SHORT_NAME
					} );
				}
			} );
				
			res.json({
				status: true,
				message: 'Data Sync tanggal ' + HelperLib.date_format( req.params.start_date, 'YYYY-MM-DD' ) + ' s/d ' + HelperLib.date_format( req.params.end_date, 'YYYY-MM-DD' ),
				data: {
					"hapus": temp_delete,
					"simpan": temp_insert,
					"ubah": temp_update
				}
			});
				
		} ).catch( err => {
			console.log( err );
			return res.send({
				status: false,
				message: "Error retrieving Data",
				data: {}
			} );
		} );
	};