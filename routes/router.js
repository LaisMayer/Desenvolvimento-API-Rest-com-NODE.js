import express from "express";
import store from "../date/sample.data.js";

const router = express.Router();


// CREATE
router.post("/alunos", (req, res) => {
  const { nome, cpf, telefone, email, matricula, escola } = req.body;
  const novo = {
    id: store.nextId++,
    nome,
    cpf,
    telefone,
    email,
    matricula,
    escola
  };
  store.alunos.push(novo);
  res.status(201).json(novo);
});

// READ
router.get("/alunos", (req, res) => {
  res.json(store.alunos);
});

// UPDATE
router.put("/alunos/:id", (req, res) => {
  const id = Number(req.params.id);
  const aluno = store.alunos.find(a => a.id === id);

  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });

  const { nome, cpf, telefone, email, matricula, escola } = req.body;
  aluno.nome = nome || aluno.nome;
  aluno.cpf = cpf || aluno.cpf;
  aluno.telefone = telefone || aluno.telefone;
  aluno.email = email || aluno.email;
  aluno.matricula = matricula || aluno.matricula;
  aluno.escola = escola || aluno.escola;

  res.json(aluno);
});

// DELETE
router.delete("/alunos/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = store.alunos.findIndex(a => a.id === id);

  if (idx === -1) return res.status(404).json({ error: "Aluno não encontrado" });

  store.alunos.splice(idx, 1);
  res.json({ message: "Aluno removido com sucesso" });
});

// module.exports = router;
export default router;
