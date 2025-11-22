const mongoose = require('mongoose');

const InsumoNecessario = new mongoose.Schema({
  insumo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Insumo', 
    required: true 
  },
  quantidade: { 
    type: Number, 
    required: true 
  }
}, { _id: false });

const EncomendaSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  descricao: { 
    type: String 
  },
  preco: { 
    type: Number, 
    required: true 
  },
  imagemUrl: { 
    type: String 
  },
  insumosNecessarios: [InsumoNecessario],
  ativa: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Encomenda', EncomendaSchema);
