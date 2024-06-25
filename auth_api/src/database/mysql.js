
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user1', // Substitua pelo seu usuário do MySQL
  password: 'pass', // Substitua pela sua senha do MySQL
  database: 'teste' // Substitua pelo nome do seu banco de dados
});

connection.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

module.exports = connection;
