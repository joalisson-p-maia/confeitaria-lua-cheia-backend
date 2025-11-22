const mongoose = require('mongoose');

const InsumoSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true, 
    unique: true 
  },
  quantidade: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  unidadeMedida: { 
    type: String, 
    required: true 
  },
  estoqueMinimo: { 
    type: Number, 
    default: 0 
  },
  preco: { 
    type: String, 
    required: true 
  },
  custoPorUnidade: { 
    type: Number, 
    default: 0 
  }
}, { timestamps: true });

module.exports = mongoose.model('Insumo', InsumoSchema);
