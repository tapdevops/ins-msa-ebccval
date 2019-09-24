/*
|--------------------------------------------------------------------------
| Variable
|--------------------------------------------------------------------------
*/
	// Node Modules
	const Kafka = require( 'kafka-node' );

/*
|--------------------------------------------------------------------------
| Kafka
|--------------------------------------------------------------------------
|
| Apache Kafka is an open-source stream-processing software platform 
| developed by LinkedIn and donated to the Apache Software Foundation, 
| written in Scala and Java. The project aims to provide a unified, 
| high-throughput, low-latency platform for handling real-time data feeds.
|
*/
	module.exports = function( req, res, next ) {
		// Class
		const Producer = Kafka.Producer;
		const Client = new Kafka.KafkaClient( { kafkaHost: '149.129.252.13:9092' }  );

		// Variable
		const producer_kafka_client = new Producer( Client );
		const kafka_topic = 'testTopic';
		const payloads = [
			{
				topic: kafka_topic,
				messages: "Kirim dari local - 1"
			}
		];

		producer_kafka_client.on( 'ready', async function() {
			const push_status = producer_kafka_client.send( payloads, ( err, data ) => {
				if ( err ) {
					console.log( '[KAFKA PRODUCER] - Broker Update Failed.' );
				} else {
					console.log( '[KAFKA PRODUCER] - Broker Update Success.' );
				}
			} );
		} );

		producer_kafka_client.on( 'error', function(err) {
			console.log( err );
			console.log( '[KAFKA PRODUCER] - Connection Error.' );
			throw err;
		});

		next();
	};	