const express = require("express");

const server = express();

server.use(express.json());

// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend }

const cursos = ["Node JS", "JavaScript", "React Native"];

// ------------------ READ -----------------------
server.get('/cursos', (req, res) => {
  return res.json(cursos);
});

// localhost:3000/curso/2
server.get("/cursos/:index", (req, res) => {
  // const nome = req.query.nome;
  // const id = req.query.id;
  const { index } = req.params;

  // return res.json({ curso: `Curso: ${nome}` });
  // return res.json({ curso: `Curso: ${id}` });
  return res.json(cursos[index]);
});

// ------------------ CREATE -----------------------
server.post('/cursos', (req, res) => {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

// ------------------ UPDATE -----------------------
server.put('/cursos/:index', (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

// ------------------ DELETE -----------------------
server.delete('/cursos/:index', (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json({ message: "Curso deletado com sucesso!" });
});

server.listen(3000);
