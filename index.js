const express = require("express");

const server = express();

// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend }

const cursos = ["Node JS", "JavaScript", "React Native"];

// localhost:3000/curso/2
server.get("/curso/:index", (req, res) => {
  // const nome = req.query.nome;
  // const id = req.query.id;
  const { index } = req.params;

  // return res.json({ curso: `Curso: ${nome}` });
  // return res.json({ curso: `Curso: ${id}` });
  return res.json(cursos[index]);
});

server.listen(3000);
