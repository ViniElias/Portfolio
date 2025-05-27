const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

// Multer: onde salvar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'public/images/uploads')),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  }
});
const upload = multer({ storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Conexão MySQL (id, nome, descricao, tecnologias, repo_link, imagem)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'portfolio'
});

// Rota de listagem
app.get('/', (req, res) => {
  db.query('SELECT * FROM projetos', (err, projetos) => {
    if (err) return res.status(500).send(err);
    res.render('index', { titulo: 'Meu Portfólio', projetos });
  });
});

// Rota POST usa multer e insere todos os campos
app.post('/projetos', upload.single('imagem'), (req, res) => {
  const { nome, descricao, tecnologias, repo_link } = req.body;
  const imagem = req.file ? '/images/uploads/' + req.file.filename : null;
  const sql = `
    INSERT INTO projetos
      (nome, descricao, tecnologias, repo_link, imagem)
    VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [nome, descricao, tecnologias, repo_link, imagem],
    err => {
      if (err) return res.status(500).send(err);
      res.redirect('/');
    }
  );
});

// Rota de delete
app.post('/projetos/:id/delete', (req, res) => {
  db.query('DELETE FROM projetos WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).send(err);
    res.redirect('/');
  });
});

app.listen(port, () => console.log(`Rodando em http://localhost:${port}`));