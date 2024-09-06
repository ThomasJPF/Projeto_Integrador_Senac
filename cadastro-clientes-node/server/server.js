const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para processar dados enviados via POST
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve arquivos estáticos

// Caminho para o arquivo JSON que simula o banco de dados
const cadastrosFile = path.join(__dirname, '../data/cadastros.json');

// Função para carregar os cadastros existentes
function carregarCadastros() {
    if (!fs.existsSync(cadastrosFile)) {
        return [];
    }
    const data = fs.readFileSync(cadastrosFile);
    return JSON.parse(data);
}

// Função para salvar os cadastros no arquivo JSON
function salvarCadastro(cadastros) {
    fs.writeFileSync(cadastrosFile, JSON.stringify(cadastros, null, 2));
}

// Rota para cadastrar um cliente
app.post('/api/cadastrar', (req, res) => {
    const cadastros = carregarCadastros();
    const novoCadastro = req.body;

    // Adiciona o novo cadastro e salva no arquivo JSON
    cadastros.push(novoCadastro);
    salvarCadastro(cadastros);

    res.json({ success: true });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
