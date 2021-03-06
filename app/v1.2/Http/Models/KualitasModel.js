/*
 |--------------------------------------------------------------------------
 | Variable
 |--------------------------------------------------------------------------
 */
	const Mongoose = require( 'mongoose' );

/*
 |--------------------------------------------------------------------------
 | Schema
 |--------------------------------------------------------------------------
 */
	const KualitasSchema = Mongoose.Schema( {
		ID_KUALITAS: String,
		NAMA_KUALITAS: String,
		UOM: String,
		GROUP_KUALITAS: String,
		ACTIVE_STATUS: String,
		PENALTY_STATUS: String,
		SHORT_NAME: String,
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

/*
 |--------------------------------------------------------------------------
 | Module Exports
 |--------------------------------------------------------------------------
 */
	module.exports = Mongoose.model( 'Kualitas_v_1_2', KualitasSchema, 'TM_KUALITAS' );