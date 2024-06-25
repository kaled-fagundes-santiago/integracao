const kafka = require('kafka-node');

const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }); // Altere para o endereço do seu Kafka
const producer = new Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
    console.error('Error in Kafka Producer', err);
});

function sendMessage(topic, message) {
    const payloads = [
        { topic: topic, messages: JSON.stringify(message), partition: 0 }
    ];
    producer.send(payloads, (err, data) => {
        if (err) {
            console.error('Failed to send message to Kafka', err);
        } else {
            console.log('Message sent to Kafka', data);
        }
    });
}

module.exports = sendMessage;
