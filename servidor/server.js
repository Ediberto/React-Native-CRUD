const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    connectionLimit: 10, // Número máximo de conexões no pool
    //host: '192.168.0.125',
    host: 'localhost',  // ou o IP do seu servidor MySQL
    user: 'root',       // usuário MySQL
    password: 'ediberto',       // senha do MySQL
    database: 'flamengo_db'  // banco de dados
});
// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});
// Função para GRAVAR REGISTROS NA TABELA
app.post('/gravar', (req, res) => {
    const { usermat, username } = req.body;
    const query = 'INSERT INTO torcedores (matricula, nome) VALUES (?, ?)';
    db.query(query, [usermat, username], (err, result) => {
        if (err) {
            console.error('Erro ao gravar no banco de dados:', err);
            res.status(500).send({ message: 'Erro ao gravar no banco de dados.' });
        } else {
            res.status(200).send({ message: 'Dados gravados com sucesso!' });
        }
    });
});
// Função para CONSULTAR REGISTROS NA TABELA COM BASE NA MATRICULA
// faz uma requisição GET para o backend, passando a matrícula do torcedor que deseja consultar.
app.get('/consultar/:usermat', (req, res) => {
    const { usermat } = req.params;
    if (!usermat) {
        return res.status(400).json({ message: 'Matrícula não fornecida.' });
    }
    const query = 'SELECT nome FROM torcedores WHERE matricula = ?';
    db.query(query, [usermat], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ message: 'Erro ao consultar os dados.' });
        }
        if (results.length > 0) {
            console.log(`Torcedor encontrado: ${results[0].nome}`);
            res.json({ username: results[0].nome });
        } else {
            console.log('Torcedor não encontrado.');
            res.status(404).json({ message: 'Torcedor não encontrado.' });
        }
    });
});
// Função para ALTERAR o nome do torcedor com base na matrícula
app.put('/alterar/:usermat', (req, res) => {
    const { usermat } = req.params;
    const { username } = req.body;
    // Validação dos dados
    if (!usermat || !username) {
        return res.status(400).json({ message: 'Matrícula e Nome são obrigatórios para alteração.' });
    }
    const query = 'UPDATE torcedores SET nome = ? WHERE matricula = ?';
    db.query(query, [username, usermat], (err, result) => {
        if (err) {
            console.error('Erro ao alterar no banco de dados:', err);
            return res.status(500).json({ message: 'Erro ao alterar os dados.' });
        }

        if (result.affectedRows > 0) {
            res.json({ message: 'Dados alterados com sucesso!' });
        } else {
            res.status(404).json({ message: 'Torcedor não encontrado.' });
        }
    });
});
// Função para EXCLUIR REGISTROS NA TABELA COM BASE NA MATRICULA
// faz uma requisição DELETE para o backend, passando a matrícula do torcedor que deseja excluir.
app.delete('/excluir/:usermat', (req, res) => {
    const { usermat } = req.params;
    const query = 'DELETE FROM torcedores WHERE matricula = ?';

    db.query(query, [usermat], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao excluir o torcedor.' });
        } else {
            res.send({ message: 'Torcedor excluído com sucesso!' });
        }
    });
});
// Rota para LISTAR TODOS os registros na tabela
app.get('/listarTodos', (req, res) => {
    const query = 'SELECT matricula, nome FROM torcedores';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao listar os registros:', err);
            return res.status(500).json({ message: 'Erro ao listar os registros.' });
        }
        console.log('Registros listados com sucesso:', results); // Log para verificar os resultados
        res.json(results);
    });
});
// Iniciar o servidor na porta 3000
app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 3000');
});
