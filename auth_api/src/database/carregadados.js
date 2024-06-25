// carregadados.js

const connection = require('./mysql');
const Produto = require('../models/produto');

async function carregarDados() {
  const produtos = [
    new Produto('Produto 1', 'Empresa 1', 'Descricao 1', 10, 'Marca 1', 100.00),
    new Produto('Produto 2', 'Empresa 2', 'Descricao 2', 20, 'Marca 2', 200.00),
    // Adicione mais produtos conforme necessário
  ];

  for (let produto of produtos) {
    await new Promise((resolve, reject) => {
      const query = 'INSERT INTO produtos (nome, empresa, descricao, quantidade, marca, valor) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(query, [produto.nome, produto.empresa, produto.descricao, produto.quantidade, produto.marca, produto.valor], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  console.log('Dados carregados no MySQL!');
}

module.exports = { carregarDados };
