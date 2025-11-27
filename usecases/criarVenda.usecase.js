const mongoose = require('mongoose');
const Encomenda = require('../schemas/encomenda.schema');
const Insumo = require('../schemas/insumo.schema');
const Venda = require('../schemas/venda.schema');
const { calcularCustoEncomenda } = require('../utils/calcula.util');

async function criarVenda({ itens, cliente = '', dataVenda, total }) {
  const sessao = await mongoose.startSession();
  sessao.startTransaction();
  try {
    if (!Array.isArray(itens) || itens.length === 0) {
      throw new Error('Itens da venda são obrigatórios');
    }

    let totalCalculado = 0;
    let custoTotal = 0;
    const vendaItems = [];

    for (const it of itens) {
      const encomenda = await Encomenda.findById(it.encomenda).populate('insumosNecessarios.insumo').session(sessao);
      if (!encomenda) throw new Error(`Encomenda não encontrada: ${it.encomenda}`);

      const quantidade = Number(it.quantidade);
      if (quantidade <= 0) throw new Error('Quantidade deve ser maior que 0');

      //calcula preço e custo
      totalCalculado += encomenda.preco * quantidade;
      const custoEncomenda = calcularCustoEncomenda(encomenda.insumosNecessarios, quantidade);
      custoTotal += custoEncomenda;

      //verifica e decrementar insumos
      for (const reqInsumo of encomenda.insumosNecessarios) {
        const necessario = reqInsumo.quantidade * quantidade;
        const insumoDoc = await Insumo.findById(reqInsumo.insumo._id).session(sessao);
        if (!insumoDoc) throw new Error(`Insumo não encontrado: ${reqInsumo.insumo._id}`);
        if (insumoDoc.quantidade < necessario) {
          throw new Error(`Estoque insuficiente para insumo "${insumoDoc.nome}". necessário: ${necessario}, disponível: ${insumoDoc.quantidade}`);
        }
        insumoDoc.quantidade -= necessario;
        await insumoDoc.save({ sessao });
      }

      vendaItems.push({ encomenda: encomenda._id, quantidade, precoUnitario: encomenda.preco });
    }

    const vendaDoc = new Venda({
      itens: vendaItems,
      total: totalCalculado,
      custoTotal,
      cliente,
      dataVenda: dataVenda || new Date(),
    });

    await vendaDoc.save({ sessao });

    await sessao.commitTransaction();
    sessao.endSession();

    return await Venda.findById(vendaDoc._id).populate('itens.encomenda');
  } catch (err) {
    await sessao.abortTransaction();
    sessao.endSession();
    throw err;
  }
}

module.exports = criarVenda;
