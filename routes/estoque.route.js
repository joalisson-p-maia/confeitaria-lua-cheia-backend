const express = require('express');
const router = express.Router();
const Insumo = require('../schemas/insumo.schema');
const { handleError } = require('../utils/erro.util');


router.get('/listar', async (req, res) => {
  try {
    const insumos = await Insumo.find().lean();
    res.json(insumos.map
      (i => (
        { 
          id: i._id, 
          nome: i.nome, 
          quantidade: i.quantidade, 
          unidadeMedida: i.unidadeMedida 
        }
      ))
    );
  } catch (err) { handleError(res, err); }
});

router.post("/movimentacao", async (req, res) => {
  try {
    const { nome, tipo, quantidade } = req.body;

    const insumo = await Insumo.findOne({ $where: { nome } });
    if (!insumo) return res.status(404).json({ message: "Insumo não encontrado" });

    if (tipo === "entrada") {
      insumo.quantidade += Number(quantidade);
    } else if (tipo === "saida") {
      insumo.quantidade -= Number(quantidade);
      if (insumo.quantidade < 0) insumo.quantidade = 0;
    } else {
      return res.status(400).json({ message: "Tipo de movimentação inválido" });
    }

    await insumo.save();
    res.json(insumo);

  } catch (err) { handleError(res, err); }
});


module.exports = router;
