/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = {
		production: {
			url: 'mongodb://dbapp:dbapp123@dbapp.tap-agri.com:27017/s_ebcc_validation?authSource=admin',
			ssl: false
		},
		development: {
			url: 'mongodb://s_ebcc_validation:s_ebcc_validation@dbappdev.tap-agri.com:4848/s_ebcc_validation?authSource=s_ebcc_validation',
			ssl: false
		}
	}
	