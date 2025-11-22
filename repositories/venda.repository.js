const Venda = require('../schemas/venda.schema');

const VendaRepository = {
  criar: (criarVendaDTO, opcoes = {}) => new Venda(criarVendaDTO).save(opcoes),
  listarPorMes: (mes, ano) => Venda.find({mes: Number(mes),ano: Number(ano)}).lean(),
  listar: (filter = {}) => Venda.find(filter).populate('itens.encomenda').lean(),
  buscarPorId: (id) => Venda.findById(id).populate('itens.encomenda')
};

module.exports = VendaRepository;
