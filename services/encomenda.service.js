const EncomendaRepositorio = require('../repositories/encomenda.repository');

const EncomendaService = {
  listar: () => EncomendaRepositorio.listar(),
  buscarPorId: (id) => EncomendaRepositorio.buscarPorId(id),
  criar: (criarEncomendaDTO) => EncomendaRepositorio.criar(criarEncomendaDTO),
  atualizar: (id, atualizarEncomendaDTO) => EncomendaRepositorio.atualizar(id, atualizarEncomendaDTO),
  remover: (id) => EncomendaRepositorio.remover(id)
};

module.exports = EncomendaService;
