const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Configuração do MongoDB
const mongoUri = "mongodb+srv://tjpfiametttj:oqJjzsSrTqveHDrV@cluster0.suugc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUri).then(() => {
    console.log('Conectado ao MongoDB!');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Definindo o esquema do cliente
const clienteSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    endereco: String,
    marca_pc: String,
    modelo_pc: String,
    descricao_problema: String,
    aplicativos: [String],
    fechada: { type: Boolean, default: false },
    dataCadastro: { type: Date, default: Date.now }
});

// Criando o modelo do Cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Rota para a página de cadastro
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota para salvar o cadastro no MongoDB
app.post('/api/cadastrar', async (req, res) => {
    try {
        console.log("Dados recebidos do formulário:", req.body);
        const novoCliente = new Cliente(req.body);
        const result = await novoCliente.save();
        console.log("Cadastro salvo com sucesso:", result);
        res.json({ success: true });
    } catch (err) {
        console.error("Erro ao salvar o cadastro:", err);
        res.json({ success: false, error: err.message });
    }
});

// Rota para listar as ordens de serviço abertas
app.get('/api/ordens-abertas', async (req, res) => {
    try {
        const ordensAbertas = await Cliente.find({ fechada: false });
        res.json(ordensAbertas);
    } catch (err) {
        console.error("Erro ao buscar ordens de serviço:", err);
        res.json({ success: false, error: err.message });
    }
});

// Rota para fechar uma ordem de serviço
app.patch('/api/fechar-ordem/:id', async (req, res) => {
    try {
        await Cliente.findByIdAndUpdate(req.params.id, { fechada: true });
        res.json({ success: true });
    } catch (err) {
        console.error("Erro ao fechar a ordem de serviço:", err);
        res.json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
