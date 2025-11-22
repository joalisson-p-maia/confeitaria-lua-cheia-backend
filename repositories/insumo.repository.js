const Insumo = require('../schemas/insumo.schema');

const InsumoRepository = {
  criar: (criarInsumoDTO) => Insumo.create(criarInsumoDTO),
  listar: () => Insumo.find().lean(),
  buscarPorId: (id) => Insumo.findById(id),
  buscarPorNome: (nome) => Insumo.findOne({ nome }),
  atualizar: (id, atualizarInsumoDTO) => Insumo.findByIdAndUpdate(id, atualizarInsumoDTO, { new: true }),
  remover: (id) => Insumo.findByIdAndDelete(id)
};

module.exports = InsumoRepository;
