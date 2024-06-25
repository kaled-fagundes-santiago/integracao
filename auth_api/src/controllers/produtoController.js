// usuarioController.js

const connection = require('../database/mysql');
const auth = require('../auth');

class UsuarioController {
  async cadastrar(req, res) {
    try {
      const usuario = req.body;
      const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
      const [result] = await connection.promise().execute(query, [usuario.nome, usuario.email, usuario.senha]);
      usuario.id = result.insertId;
      res.status(201).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao cadastrar o usuário' });
    }
  }

  async editar(req, res) {
    try {
      const id = req.params.id;
      const { nome, email, senha } = req.body;
      const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = ?, data_atualizacao = CURRENT_TIMESTAMP WHERE id = ?';
      await connection.promise().execute(query, [nome, email, senha, id]);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao editar o usuário' });
    }
  }

  async listarTodos(req, res) {
    try {
      const query = 'SELECT * FROM usuarios';
      const [rows] = await connection.promise().execute(query);
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar todos os usuários' });
    }
  }

  async listarPorId(req, res) {
    try {
      const id = req.params.id;
      const query = 'SELECT * FROM usuarios WHERE id = ?';
      const [rows] = await connection.promise().execute(query, [id]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o usuário por ID' });
    }
  }

  async encontrarUsuario(req, res) {
    try {
      const { email, senha } = req.body;
      const query = 'SELECT * FROM usuarios WHERE email = ? and senha = ?';
      const [rows] = await connection.promise().execute(query, [email, senha]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o usuário por ID' });
    }
  }

  async listarPorFiltros(req, res) {
    try {
      const { nome, email } = req.query;
      let query = 'SELECT * FROM usuarios WHERE 1=1';
      const params = [];

      if (nome) {
        query += ' AND nome = ?';
        params.push(nome);
      }
      if (email) {
        query += ' AND email = ?';
        params.push(email);
      }

      const [rows] = await connection.promise().execute(query, params);
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar os usuários por filtros' });
    }
  }

  async excluir(req, res) {
    try {
      const id = req.params.id;
      const query = 'DELETE FROM usuarios WHERE id = ?';
      const [result] = await connection.promise().execute(query, [id]);
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.status(200).send();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir o usuário' });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const query = 'SELECT * FROM usuarios WHERE email = ? and senha = ?';
      const [rows] = await connection.promise().execute(query, [email, senha]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
        
      } 
      const usuario = rows[0];
      if (!usuario) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }
      const token = auth.gerarToken(usuario);
      res.send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o usuário por ID' });
    }
  }
}

module.exports = new UsuarioController();
