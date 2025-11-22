const express = require("express");
const router = express.Router();
const VendaController = require('../controllers/venda.controller');


router.get("/listar", VendaController.listar);
//api/vendas/listar?mes=10&ano=2025
router.get("/listar/vendasPorMes", VendaController.listarPorMes);
router.get("/buscar/:id", VendaController.buscarPorId);
router.post("/criar", VendaController.criar);

module.exports = router;
