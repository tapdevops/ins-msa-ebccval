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
	exports.web_report_per_baris_v_1_0 = ( req, res ) => {
		res.json( {
			message: "OK",
			auth: req.auth
		} );
	}