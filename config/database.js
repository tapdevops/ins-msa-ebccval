/*
 |--------------------------------------------------------------------------
 | Database Connections
 |--------------------------------------------------------------------------
 |
 | Here are each of the database connections setup for your application.
 | Of course, examples of configuring each database platform that is
 | supported by NodeJS is shown below to make development simple.
 |
 */
	module.exports = {
		
		dev: {
			url: 'mongodb://s_ebcc_validation:s_ebcc_validation@dbappdev.tap-agri.com:4848/s_ebcc_validation?authSource=s_ebcc_validation',
			ssl: false
		},
		qa: {
			url: 'mongodb://s_ebcc_validation:s_ebcc_validation@dbappdev.tap-agri.com:4848/s_ebcc_validation?authSource=s_ebcc_validation',
			ssl: false
		},
		prod: {
			url: 'mongodb://s_ebcc_validation:38ccvalid2019@dbapp.tap-agri.com:4848/s_ebcc_validation?authSource=s_ebcc_validation',
			ssl: false
		}
	}