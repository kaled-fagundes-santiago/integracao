// usuario.js

class Usuario {
  constructor(id, nome, email, senha, dataCriacao, dataAtualizacao) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }
}

module.exports = Usuario;
