const express = require('express');
const app = express();
const port = 3000;

// Diretório dos arquivos estáticos
app.use(express.static('public'));

// Define EJS como view engine
app.set('view engine', 'ejs');

// Rotas
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Portfólio', nome: 'Vinicius Elias' });
});

app.get('/projetos', (req, res) => {
  const projetos = [
    { nome: 'Projeto 1', descricao: 'Descrição do Projeto 1' },
    { nome: 'Projeto 2', descricao: 'Descrição do Projeto 2' }
  ];
  res.render('projetos', { titulo: 'Projetos', projetos });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
