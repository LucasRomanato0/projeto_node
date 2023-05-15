const express = require("express");

const server = express();

server.use(express.json());

// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend }

const cursos = ["Node JS", "JavaScript", "React Native"];

//Middleware global
server.use((req, res, next) => {
  console.log(`URL CHAMADA: ${req.url}`);

  return next();
});

//Caso algo esteja faltando ou estiver errado na requisicao
function checkCurso(req, res, next){
  if(!req.body.name){
    return res.status(400).json({ error: "Nome do curso é obrigatorio" });
  }

  return next();
};

function checkIndexCurso(req, res, next){
  const curso = cursos[req.param.index];
  if(!curso){
    return res.status(400).json({ error: "O curso não existe" });
  }

  req.curso = curso;

  return next();
}

// ------------------ READ -----------------------
server.get('/cursos', (req, res) => {
  return res.json(cursos);
});

// localhost:3000/curso/2
server.get("/cursos/:index", checkIndexCurso, (req, res) => {
  // const nome = req.query.nome;
  // const id = req.query.id;
  // const { index } = req.params;

  // return res.json({ curso: `Curso: ${nome}` });
  // return res.json({ curso: `Curso: ${id}` });
  // return res.json(cursos[index]);
  return res.json(req.curso);
});

// ------------------ CREATE -----------------------
server.post('/cursos', checkCurso, (req, res) => {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

// ------------------ UPDATE -----------------------
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

// ------------------ DELETE -----------------------
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json({ message: "Curso deletado com sucesso!" });
});

server.listen(3000);
