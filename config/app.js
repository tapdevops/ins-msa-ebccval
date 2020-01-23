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
			name: 'Microservice EBCC Validation',
			env: 'dev', // prod, qa, dev,
			port: {
				dev: process.env.PORT || 4014,
				qa: process.env.PORT || 5014,
				prod: process.env.PORT || 3014,
			},
		/*
		|--------------------------------------------------------------------------
		| Kafka Config
		|--------------------------------------------------------------------------
		*/
			kafka: {
				dev: {
					server_host: '149.129.221.137:9092'
				},
				qa: {
					server_host: '149.129.221.137:9092'
				},
				prod: {
					server_host: '149.129.252.13:9092'
				}
			},

		/*
		|--------------------------------------------------------------------------
		| URL
		|--------------------------------------------------------------------------
		*/
			url: {
				dev: {
					ldap: 'http://tap-ldapdev.tap-agri.com/login',
					ldap_2: 'http://tap-ldapdev.tap-agri.com',
					microservice_auth: 'http://taptest.tap-agri.com/mobileinspectiondev/ins-msa-dev-auth',
					microservice_ebcc_validation: 'http://taptest.tap-agri.com/mobileinspectiondev/ins-msa-dev-ebccval',
					microservice_finding: 'http://taptest.tap-agri.com/mobileinspectiondev/ins-msa-dev-finding',
					microservice_hectare_statement: 'http://taptest.tap-agri.com/mobileinspectiondev/ins-msa-dev-hectarestatement',
					microservice_inspection: 'http://taptest.tap-agri.com/mobileinspectiondev/ins-msa-dev-inspection',
					microservice_images: 'http://149.129.250.199:3012',
				},
				qa: {
					ldap: 'http://tap-ldapdev.tap-agri.com/login',
					ldap_2: 'http://tap-ldapdev.tap-agri.com',
					microservice_auth: 'http://taptest.tap-agri.com/mobileinspectionqa/ins-msa-qa-auth',
					microservice_ebcc_validation: 'http://taptest.tap-agri.com/mobileinspectionqa/ins-msa-qa-ebccval',
					microservice_finding: 'http://taptest.tap-agri.com/mobileinspectionqa/ins-msa-qa-finding',
					microservice_hectare_statement: 'http://taptest.tap-agri.com/mobileinspectionqa/ins-msa-qa-hectarestatement',
					microservice_inspection: 'http://taptest.tap-agri.com/mobileinspectionqa/ins-msa-qa-inspection',
					microservice_images: 'http://149.129.246.66:5012',
				},
				prod: {
					ldap: 'http://tap-ldap.tap-agri.com/login',
					ldap_2: 'http://tap-ldap.tap-agri.com',
					microservice_auth: 'http://app.tap-agri.com/mobileinspection/ins-msa-auth',
					microservice_ebcc_validation: 'http://app.tap-agri.com/mobileinspection/ins-msa-ebccval',
					microservice_finding: 'http://app.tap-agri.com/mobileinspection/ins-msa-finding',
					microservice_hectare_statement: 'http://app.tap-agri.com/mobileinspection/ins-msa-hectarestatement',
					microservice_inspection: 'http://app.tap-agri.com/mobileinspection/ins-msa-inspection',
					microservice_images: 'http://149.129.245.230:3012',
				}
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
