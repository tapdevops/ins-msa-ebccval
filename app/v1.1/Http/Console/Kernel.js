/*
|--------------------------------------------------------------------------
| Variable
|--------------------------------------------------------------------------
*/
    //Models
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
| Kernel
|--------------------------------------------------------------------------
|
| In the past, you may have generated a Cron entry for each task you needed
| to schedule on your server. However, this can quickly become a pain,
| because your task schedule is no longer in source control and you must
| SSH into your server to add additional Cron entries.
|
*/