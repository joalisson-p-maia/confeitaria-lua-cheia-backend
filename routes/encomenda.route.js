const express = require("express");
const router = express.Router();
const EncomendaController = require('../controllers/encomenda.controller');


router.get("/listar", EncomendaController.listar);
router.get("/buscar/:id", EncomendaController.buscarPorId);
router.post("/criar", EncomendaController.criar);
router.put("/editar/:id", EncomendaController.atualizar);
router.delete("/deletar/:id", EncomendaController.remover);

module.exports = router;
