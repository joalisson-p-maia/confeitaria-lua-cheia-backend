const InsumoService = require('../services/insumo.service');
const { handleError } = require('../utils/erro.util');

const InsumoController = {
  listar: async (req, res) => {
    try {
      const insumos = await InsumoService.listar();
      res.status(200).json(insumos);
    } catch (err) { handleError(res, err); }
  },

  buscarPorId: async (req, res) => {
    try {
      const insumo = await InsumoService.buscarPorId(req.params.id);
      if (!insumo) return res.status(404).json({ message: 'Insumo não encontrado' });
      res.status(200).json(insumo);
    } catch (err) { handleError(res, err); }
  },

  criar: async (req, res) => {
    try {
      const criarInsumo = await InsumoService.criar(req.body);
      res.status(201).json(criarInsumo);
    } catch (err) { handleError(res, err); }
  },

  atualizar: async (req, res) => {
    try {
      const atualizarInsumo = await InsumoService.atualizar(req.params.id, req.body);
      res.status(200).json(atualizarInsumo);
    } catch (err) { handleError(res, err); }
  },

  remover: async (req, res) => {
    try {
      await InsumoService.remover(req.params.id);
      res.status(204).send();
    } catch (err) { handleError(res, err); }
  }
};

module.exports = InsumoController;
