/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
     const EBCCValidationHeaderModel = require( _directory_base + '/app/v1.1/Http/Models/EBCCValidationHeaderModel.js' );
     const EBCCValidationDetailModel = require( _directory_base + '/app/v1.1/Http/Models/EBCCValidationDetailModel.js' );

	// Modules
    const Kafka = require( 'kafka-node' );
	// const Kafka = require( 'kafka-node' );

	// Libraries
	const KafkaServer = require( _directory_base + '/app/v1.1/Http/Libraries/KafkaServer.js' );

/*
 |--------------------------------------------------------------------------
 | Versi 1.1
 |--------------------------------------------------------------------------
 */
 	/** 
 	  * Create
	  * @desc Untuk export data ke kafka
	  * @return json
	  * --------------------------------------------------------------------
    */
        exports.export_header = async ( req, res ) => {
            const query =  await EBCCValidationHeaderModel.aggregate( [
                {
                    $project: {
                        _id: 0
                    }
                }
            ] );
            let index = 0;
            query.forEach( function ( data ) {
                var kafka_body = {
                    EBVTC: data.EBCC_VALIDATION_CODE,
                    WERKS: data.WERKS,
                    AFD_CODE: data.AFD_CODE,
                    BLOCK_CODE: data.BLOCK_CODE,
                    NO_TPH: data.NO_TPH,
                    STPHS: data.STATUS_TPH_SCAN,
                    ALSNM: data.ALASAN_MANUAL || "",
                    LAT_TPH: data.LAT_TPH,
                    LON_TPH: data.LON_TPH,
                    DLVCD: data.DELIVERY_CODE,
                    SDLVC: data.STATUS_DELIVERY_CODE,
                    INSUR: data.INSERT_USER,
                    INSTM: data.INSERT_TIME,
                    SSYNC: data.STATUS_SYNC || "",
                    STIME: data.SYNC_TIME || 0,
                    UPTUR: data.UPDATE_USER || "",
                    UPTTM: data.UPDATE_TIME || 0
                }
                console.log( ++index );
                KafkaServer.producer( 'INS_MSA_EBCCVAL_TR_EBCC_VALIDATION_H', JSON.stringify( kafka_body ));   
            } )
        }

        exports.export_detail = async ( req, res ) => {
            try{
                /*
                const query = await EBCCValidationDetailModel.aggregate( [
                    {
                        $project: {
                            _id: 0
                        }
                    },
                    {
                        $limit: 10
                    }
                ] );
                let index = 0;
                
                */
               //for ( var j = 0; j <= 77000; j+=1000 ) {
                //    j = parseInt( j );
                //    console.log( j );
                   const query = await EBCCValidationDetailModel.aggregate([
                        {
                            $project: {
                                _id: 0,
                                __v: 0
                            }
                        },
                        {
                            $sort: {
                                _id: -1
                            }
                        },
                        {
                            $skip: 75000
                        },
                        {
                            $limit: 1652
                        }
                    ]);
                    query.forEach( function ( data ) {
                        var kafka_body = {
                            EBVTC: data.EBCC_VALIDATION_CODE,
                            IDKLT: data.ID_KUALITAS,
                            JML: data.JUMLAH,
                            INSUR: data.INSERT_USER,
                            INSTM: data.INSERT_TIME,
                            SSYNC: data.STATUS_SYNC,
                            STIME: data.SYNC_TIME,
                            UPTUR: data.UPDATE_USER,
                            UPTTM: data.UPDATE_TIME
                        }
                        KafkaServer.producer( 'INS_MSA_EBCCVAL_TR_EBCC_VALIDATION_D', JSON.stringify( kafka_body ) );
                    } );
                // }
                res.send( {
                    status: true
                } )
            } catch( err ) {
                res.send( {
                    status: false,
                    message: err.message
                } )
            }
            
        }