/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = {

		/*
		|--------------------------------------------------------------------------
		| App Config
		|--------------------------------------------------------------------------
		*/
			//port: process.env.PORT || 3014,
			name: 'Microservice EBCC Validation',
			env: 'development', // production, quality_assurance, development,
			port: {
				development: process.env.PORT || 4014,
				quality_assurance: process.env.PORT || 5014,
				production: process.env.PORT || 3014,
			},

		/*
		|--------------------------------------------------------------------------
		| Token
		|--------------------------------------------------------------------------
		*/
			secret_key: 'T4pagri123#',
			token_expiration: 7, // Days
			token_algorithm: 'HS256'
	}