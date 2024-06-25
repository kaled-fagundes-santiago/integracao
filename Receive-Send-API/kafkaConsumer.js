const kafka = require('kafka-node');
const axios = require('axios');

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }); // Altere para o endereço do seu Kafka

function createConsumer(topic) {
    const consumer = new Consumer(
        client,
        [{ topic, partition: 0 }],
        {
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
        }
    );

    consumer.on('message', async (message) => {
        console.log('Message received from Kafka:', message);

        // Parse the message value
        const parsedMessage = JSON.parse(message.value);

        // Call the API to save the message in the database
        try {
            await axios.post('http://localhost:3001/saveMessage', parsedMessage);
            console.log('Message saved to the database');
        } catch (error) {
            console.error('Error saving message to the database:', error);
        }
    });

    consumer.on('error', (err) => {
        console.error('Error in Kafka Consumer:', err);
    });
}

module.exports = createConsumer;
