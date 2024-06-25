const axios = require('axios');
const Message = require('../models/message');

class MessageController {
    async sendMessage(req, res) {
        try {
            const { userIdSend, userIdReceive, message } = req.body;
            const token = req.headers.authorization;

            // Chama a API de autenticação para verificar se está autenticado
            const authApiResponse = await axios.get(`http://localhost:3000/protegido/${userIdSend}`, {
                headers: {
                    Authorization: token
                }
            });

            if (!authApiResponse.data.auth) {
                return res.status(401).json({ msg: 'not auth' });
            }

            // Envia a mensagem para a fila (simulação)
            enviaParaAFila({
                queue: `${userIdSend}${userIdReceive}`,
                message: message
            });

            // Chama a API para escrever a mensagem na tabela de histórico
            await Message.create({
                userIdSend,
                userIdReceive,
                message
            });

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

            // Chama a API de autenticação para verificar se está autenticado
            const authApiResponse = await axios.get(`http://localhost:3000/protegido/${userIdSend}`, {
                headers: {
                    Authorization: token
                }
            });

            if (!authApiResponse.data.auth) {
                return res.status(401).json({ msg: 'not auth' });
            }

            // Consulta mensagens do canal e escreve na tabela de mensagens
            Message.findAll({where:{
                "userIdSend": userIdSend,
                "userIdReceive": userIdReceive
            }}).then((messages) => {
                const menssagesRet = readMenssages(messages);
                res.status(200).json({ msg: menssagesRet });  
            })
           
           
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}



// Função simulada para consultar mensagens do canal
 function readMenssages(messages) {
    const menssagesRet = [];
    messages.map((message) => {
        menssagesRet.push({menssagem: message.message, data: message.createdAt})

    });
    return menssagesRet; 
}

// Função simulada para enviar mensagem para a fila
function enviaParaAFila(data) {
    console.log(`Mensagem enviada para a fila: ${JSON.stringify(data)}`);
}

module.exports = new MessageController();
