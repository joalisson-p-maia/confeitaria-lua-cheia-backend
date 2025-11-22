const VendaService = require('../services/venda.service');
const VendaRepo = require('../repositories/venda.repository');
const { handleError } = require('../utils/erro.util');

const VendaController = {
  listar: async (req, res) => {
    try {
      const { mes, ano } = req.query;
      if (mes && ano) {
        const comeco = new Date(Number(ano), Number(mes) - 1, 1);
        const fim = new Date(Number(ano), Number(mes), 1);
        const vendas = await VendaRepo.listar({ dataVenda: { $gte: comeco, $lt: fim } });
        return res.json(vendas);
      }
      const listarVendas = await VendaService.listar();
      res.status(200).json(listarVendas);
    } catch (err) { handleError(res, err); }
  },

   listarPorMes: async (req, res) => {
    try {
      const { mes, ano } = req.query;

      if (!mes || !ano) {
        return res.status(400).json({
          message: "Parâmetros 'mes' e 'ano' são obrigatórios"
        });
      }

      const vendas = await VendaService.listarPorMes(Number(mes), Number(ano));
      res.status(200).json(vendas);

    } catch (err) {
      res.status(500).json({ message: "Erro ao listar vendas por mês", error: err });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const venda = await VendaService.buscarPorId(req.params.id);
      if (!venda) return res.status(404).json({ message: 'Venda não encontrada' });
      res.status(200).json(venda);
    } catch (err) { handleError(res, err); }
  },

  criar: async (req, res) => {
    try {
      const { itens, cliente } = req.body;
      const venda = await VendaService.criar({ itens, cliente });
      res.status(201).json(venda);
    } catch (err) { handleError(res, err); }
  }
};

module.exports = VendaController;
