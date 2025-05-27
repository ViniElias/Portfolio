CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;
CREATE TABLE projetos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT
);

ALTER TABLE projetos
  ADD COLUMN tecnologias TEXT AFTER descricao,
  ADD COLUMN repo_link VARCHAR(255) AFTER tecnologias,
  ADD COLUMN imagem VARCHAR(255) AFTER repo_link;