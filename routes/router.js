const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");

router.get("/alunos", controller.getAlunos);
router.get("/alunos/:id", controller.getAlunoById);
router.post("/alunos", controller.createAluno);
router.put("/alunos/:id", controller.updateAluno);
router.delete("/alunos/:id", controller.deleteAluno);

module.exports = router;
