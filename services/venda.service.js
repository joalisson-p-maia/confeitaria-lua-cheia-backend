const VendaRepositorio = require('../repositories/venda.repository');
const criarVenda = require('../usecases/criarVenda.usecase');

const VendaService = {
  listar: (filtro) => VendaRepositorio.listar(filtro),
  listarPorMes: (mes, ano) => VendaRepositorio.listarPorMes(mes, ano),
  buscarPorId: (id) => VendaRepositorio.buscarPorId(id),
  criar: (criarVendasDTO) => criarVenda(criarVendasDTO)
};

module.exports = VendaService;
