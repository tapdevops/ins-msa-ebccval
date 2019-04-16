/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
 	const KualitasModel = require( _directory_base + '/app/models/v1.0/KualitasModel.js' );

 	// Libraries
 	const HelperLib = require( _directory_base + '/app/libraries/v1.0/HelperLib.js' )

/*
 |--------------------------------------------------------------------------
 | Versi 1.0.0
 |--------------------------------------------------------------------------
 */
 	/** 
 	  * Create
	  * @desc Untuk membuat data baru.
	  * @return json
	  * --------------------------------------------------------------------
	*/
		exports.create_v_1_0 = ( req, res ) => {
	 		var auth = req.auth;
	 		var postdata = new KualitasModel( {
				ID_KUALITAS: req.body.ID_KUALITAS,
				NAMA_KUALITAS: req.body.NAMA_KUALITAS,
				UOM: req.body.UOM,
				GROUP_KUALITAS: req.body.GROUP_KUALITAS,
				ACTIVE_STATUS: req.body.ACTIVE_STATUS,
				PENALTY_STATUS: req.body.PENALTY_STATUS,
				SHORT_NAME: req.body.SHORT_NAME,
				INSERT_USER: "SYSTEM",
				INSERT_TIME: HelperLib.date_format( 'now', 'YYYYMMDDhhmmss' ),
				UPDATE_USER: "",
				UPDATE_TIME: 0,
				DELETE_USER: "",
				DELETE_TIME: 0
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

	/** 
 	  * Create Or Update
	  * @desc Untuk membuat data baru atau mengupdate data jika sudah ada.
	  * @return json
	  * --------------------------------------------------------------------
	*/
		exports.create_or_update_v_1_0 = ( req, res ) => {

	 		var post = {
	 			ID_KUALITAS: req.body.ID_KUALITAS,
				NAMA_KUALITAS: req.body.NAMA_KUALITAS,
				UOM: req.body.UOM,
				GROUP_KUALITAS: req.body.GROUP_KUALITAS,
				ACTIVE_STATUS: req.body.ACTIVE_STATUS,
				PENALTY_STATUS: req.body.PENALTY_STATUS,
				SHORT_NAME: req.body.SHORT_NAME
	 		};

	 		KualitasModel.findOne( { 
				ID_KUALITAS: req.body.ID_KUALITAS
			} ).then( data => {

				if ( !data ) {
					post.INSERT_USER = "SYSTEM";
					post.INSERT_TIME = HelperLib.date_format( 'now', 'YYYYMMDDhhmmss' );
					post.UPDATE_USER = "";
					post.UPDATE_TIME = 0;
					post.DELETE_USER = "";
					post.DELETE_TIME = 0;

					var postdata = new KualitasModel( post );

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
							message: "Success! Data berhasil di insert",
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
					if ( 
						"NAMA_KUALITAS" != req.body.NAMA_KUALITAS ||  
						"UOM" != req.body.UOM ||  
						"GROUP_KUALITAS" != req.body.GROUP_KUALITAS ||  
						"ACTIVE_STATUS" != req.body.ACTIVE_STATUS ||  
						"PENALTY_STATUS" != req.body.PENALTY_STATUS ||  
						"SHORT_NAME" != req.body.SHORT_NAME
					) {
						post.UPDATE_USER = "SYSTEM";
						post.UPDATE_TIME = HelperLib.date_format( 'now', 'YYYYMMDDhhmmss' );

						KualitasModel.findOneAndUpdate( { 
							ID_KUALITAS: req.body.ID_KUALITAS
						}, post, { new: true } )
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
								message: "Success! Data berhasil di update.",
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
						res.json( {
							status: true,
							message: "Error! periksa kembali inputan anda.",
							data: {}
						} );
					}
					
				}
			} ).catch( err => {
				return res.send({
					status: false,
					message: "Error retrieving Data",
					data: {}
				} );
			} );
	 	};

	/** 
 	  * Find
	  * @desc Untuk mengambil seluruh data dari tabel.
	  * @return json
	  * --------------------------------------------------------------------
	*/
		exports.find_v_1_0 = async ( req, res ) => {
			var url_query = req.query;
			var query = {};
			if ( Object.keys( url_query ).length > 0 ) {
				query = url_query;
				query.DELETE_TIME = 0
			}

			var query = await KualitasModel.find( query )
				.select( {
					_id: 0,
					ID_KUALITAS: 1,
					NAMA_KUALITAS: 1,
					UOM: 1,
					GROUP_KUALITAS: 1,
					ACTIVE_STATUS: 1,
					PENALTY_STATUS: 1,
					SHORT_NAME: 1
				} );
			
			res.json({
				status: true,
				message: "Success!",
				data: query
			});
		};

	/** 
 	  * Sync Mobile
	  * @desc Untuk memberikan data pada mobile berdasarkan tanggal sync.
	  * @return json
	  * --------------------------------------------------------------------
	*/
		exports.sync_mobile_v_1_0 = ( req, res ) => {
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