/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const EBCCValidationHeaderModel = require( _directory_base + '/app/v1.0/Http/Models/EBCCValidationHeaderModel.js' );
	const EBCCValidationDetailModel = require( _directory_base + '/app/v1.0/Http/Models/EBCCValidationDetailModel.js' );

	// Modules
	const Validator = require( 'ferds-validator');
	const MomentTimezone = require( 'moment-timezone');

/*
 |--------------------------------------------------------------------------
 | Versi 1.0
 |--------------------------------------------------------------------------
 */
 	/** 
 	  * Web Report Per Baris
	  * @desc Untuk mengambil data report per baris
	  * @return json
	  * --------------------------------------------------------------------
	*/
	exports.web_report_per_baris = async ( req, res ) => {

	}