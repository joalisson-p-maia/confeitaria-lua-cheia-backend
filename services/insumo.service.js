const InsumoRepositorio = require('../repositories/insumo.repository');

const InsumoService = {
  listar: () => InsumoRepositorio.listar(),
  buscarPorId: (id) => InsumoRepositorio.buscarPorId(id),
  criar: (criarInsumoDTO) => InsumoRepositorio.criar(criarInsumoDTO),
  atualizar: (id, atualizarInsumoDTO) => InsumoRepositorio.atualizar(id, atualizarInsumoDTO),
  remover: (id) => InsumoRepositorio.remover(id)
};

module.exports = InsumoService;
