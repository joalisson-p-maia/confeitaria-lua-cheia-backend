const Encomenda = require('../schemas/encomenda.schema');

const EncomendaRepository = {
  criar: (criarEncomendaDTO) => Encomenda.create(criarEncomendaDTO),
  listar: () => Encomenda.find().populate('insumosNecessarios.insumo').lean(),
  buscarPorId: (id) => Encomenda.findById(id).populate('insumosNecessarios.insumo'),
  atualizar: (id, atualizarEncomendaDTO) => Encomenda.findByIdAndUpdate(id, atualizarEncomendaDTO, { new: true }),
  remover: (id) => Encomenda.findByIdAndDelete(id)
};

module.exports = EncomendaRepository;
