let alunos = require("../data/sample.data.js");

exports.getAlunos = (req, res) => {
  res.json(alunos);
};

exports.getAlunoById = (req, res) => {
  const aluno = alunos.find(a => a.id == req.params.id);
  aluno ? res.json(aluno) : res.status(404).json({ message: "Aluno não encontrado" });
};

exports.createAluno = (req, res) => {
  const novoAluno = { id: Date.now(), ...req.body };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
};

exports.updateAluno = (req, res) => {
  const index = alunos.findIndex(a => a.id == req.params.id);
  if (index >= 0) {
    alunos[index] = { ...alunos[index], ...req.body };
    res.json(alunos[index]);
  } else {
    res.status(404).json({ message: "Aluno não encontrado" });
  }
};

exports.deleteAluno = (req, res) => {
  alunos = alunos.filter(a => a.id != req.params.id);
  res.json({ message: "Aluno deletado" });
};
