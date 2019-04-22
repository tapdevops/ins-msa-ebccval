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
 	  * Create Or Update
	  * @desc Untuk membuat data baru atau mengupdate data jika sudah ada.
	  * @return json
	  * --------------------------------------------------------------------
	*/
		exports.create_or_update = ( req, res ) => {

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
		exports.find = async ( req, res ) => {
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