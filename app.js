const express = require('express');
const app = express();
const port = 3000;

// Diretório dos arquivos estáticos
app.use(express.static('public'));

// Define EJS como view engine
app.set('view engine', 'ejs');

// Rotas
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Bem-Vindo ao meu Portfólio!', nome: 'Vinicius Elias' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
