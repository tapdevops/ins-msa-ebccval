const mongoose = require( 'mongoose' );

const EBCCValidationHeaderSchema = mongoose.Schema( {
	EBCC_VALIDATION_CODE: String,
	WERKS: String,
	AFD_CODE: String,
	BLOCK_CODE: String,
	NO_TPH: String,
	STATUS_TPH_SCAN: String,
	DELIVERY_CODE: String,
	STATUS_DELIVERY_CODE: String,
	INSERT_USER: String,
	INSERT_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	},
	UPDATE_USER: String,
	UPDATE_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	},
	DELETE_USER: String,
	DELETE_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	}
});

module.exports = mongoose.model( 'EBCCValidationHeader', EBCCValidationHeaderSchema, 'TR_H_EBCC_VALIDATION' );