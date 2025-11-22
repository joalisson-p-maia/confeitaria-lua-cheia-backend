const EncomendaService = require('../services/encomenda.service');
const { handleError } = require('../utils/erro.util');

const EncomendaController = {
  listar: async (req, res) => {
    try {
      const encomendas = await EncomendaService.listar();
      res.status(200).json(encomendas);
    } catch (err) { handleError(res, err); }
  },
  buscarPorId: async (req, res) => {
    try {
      const encomenda = await EncomendaService.buscarPorId(req.params.id);
      if (!encomenda) return res.status(404).json({ message: 'Encomenda não encontrada' });
      res.status(200).json(encomenda);
    } catch (err) { handleError(res, err); }
  },
  criar: async (req, res) => {
    try {
      const criarEncomenda = await EncomendaService.criar(req.body);
      res.status(201).json(criarEncomenda);
    } catch (err) { handleError(res, err); }
  },
  atualizar: async (req, res) => {
    try {
      const atualizarEncomenda = await EncomendaService.atualizar(req.params.id, req.body);
      res.status(200).json(atualizarEncomenda);
    } catch (err) { handleError(res, err); }
  },
  remover: async (req, res) => {
    try {
      await EncomendaService.remover(req.params.id);
      res.status(204).send();
    } catch (err) { handleError(res, err); }
  }
};

module.exports = EncomendaController;
