const express = require('express');
const router = express.Router();
const Venda = require('../schemas/venda.schema');
const Insumo = require('../schemas/insumo.schema');
const { handleError } = require('../utils/erro.util');
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
  try {
    const { ano, mes } = req.query;
    const comeco = new Date(Number(ano), Number(mes) - 1, 1);
    const fim = new Date(Number(ano), Number(mes), 1);

    const agregacao = await Venda.aggregate([
      { $match: 
        { dataVenda: 
          { 
            $gte: comeco, 
            $lt: fim 
          } 
        } 
      },
      { $group: 
        {
          _id: null,
          totalVendasMes: { $sum: '$total' },
          totalCustoMes: { $sum: '$custoTotal' },
          quantidadeVendasMes: { $sum: { $size: '$itens' } }
        }
      },
      { $project: 
        { 
          _id: 0, 
          totalVendasMes: 1, 
          totalCustoMes: 1, 
          quantidadeVendasMes: 1 
        } 
      }
    ]);

    const resultado = agregacao[0] || { totalVendasMes: 0, totalCustoMes: 0, quantidadeVendasMes: 0 };

    //calcula insumos mais usados, percorre vendas do período, soma por insumo
    const vendas = await Venda.find(
      { dataVenda: 
        { 
          $gte: comeco, 
          $lt: fim 
        } 
      }
    ).populate('itens.encomenda').lean();

    const insumoMap = {};

    for (const venda of vendas) {
      for (const it of venda.itens) {
        //cada encomenda tem insumosNecessarios
        const encomenda = await mongoose.model('Encomenda').findById(it.encomenda._id).populate('insumosNecessarios.insumo').lean();
        if (!encomenda) continue;
        for (const reqInsumo of encomenda.insumosNecessarios) {
          const usado = reqInsumo.quantidade * it.quantidade;
          const chave = String(reqInsumo.insumo._id);
          if (!insumoMap[chave]) {
            insumoMap[chave] = { 
              nome: reqInsumo.insumo.nome, 
              quantidade: 0, 
              unidadeMedida: reqInsumo.insumo.unidadeMedida 
            };
          }
          insumoMap[chave].quantidade += usado;
        }
      }
    }

    const insumosMaisUsados = Object.values(insumoMap).sort((a,b)=> b.quantidade - a.quantidade).slice(0, 10);

    res.json({ ...resultado, insumosMaisUsados });
  } catch (err) { handleError(res, err); }
});

module.exports = router;
