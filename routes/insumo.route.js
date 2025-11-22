const express = require("express");
const router = express.Router();
const InsumoController = require('../controllers/insumo.controller');


router.get("/listar", InsumoController.listar);
router.get("/buscar/:id", InsumoController.buscarPorId);
router.post("/criar", InsumoController.criar);
router.put("/editar/:id", InsumoController.atualizar);
router.delete("/deletar/:id", InsumoController.remover);

module.exports = router;
