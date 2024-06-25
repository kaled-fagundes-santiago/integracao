const axios = require('axios');
const Message = require('../models/message');
const kafkaProducer = require('../kafkaProducer');
const kafkaConsumer = require('../kafkaConsumer');

class MessageController {
    async sendMessage(req, res) {
        try {
            const { userIdSend, userIdReceive, message } = req.body;
            const token = req.headers.authorization;
    
            const authApiResponse = await axios.get(`http://localhost:3000/protegido/${userIdSend}`, {
                headers: {
                    Authorization: token
                }
            });
    
            if (!authApiResponse.data.auth) {
                return res.status(401).json({ msg: 'not auth' });
            }
    
            kafkaProducer.sendMessage(`${userIdSend}${userIdReceive}`, { userIdSend, userIdReceive, message });
    
            res.status(200).json({ message: 'message sent with success' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async processMessages(req, res) {
        try {
            const { userIdSend, userIdReceive } = req.body;
            const token = req.headers.authorization;
        
            
                const authApiResponse = await axios.get(`http://localhost:3000/protegido/${userIdSend}`, {
                    headers: { Authorization: token }
                });
        
                if (!authApiResponse.data.auth) {
                    return res.status(401).json({ msg: 'not auth' });
                }
        
                const topic = `${userIdSend}${userIdReceive}`;
                try {
                    kafkaConsumer.createConsumer(topic);
                }catch (error) {
                    console.error('Error creating consumer:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }

           
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getMessages(req, res) {
        try {
            const { user } = req.query;
            const token = req.headers.authorization;
        
            
                // Chama a API de autenticação para verificar o token
                const authApiResponse = await axios.get(`http://localhost:3000/protegido/${user}`, {
                    headers: { Authorization: token }
                });
        
                if (!authApiResponse.data.auth) {
                    return res.status(401).json({ msg: 'not auth' });
                }
    
        
                // Função para consultar mensagens da tabela message
                
                    const response = await axios.post('http://localhost:3002/message/worker', {
                        userIdSend,
                        userIdReceive
                    }, {
                        headers: { Authorization: token }
                    });
                    
                    res.status(200).json(response.data);
           
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new MessageController();
