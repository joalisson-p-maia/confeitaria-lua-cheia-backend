const mongoose = require('mongoose');

const ItemVenda = new mongoose.Schema({
  encomenda: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Encomenda', 
    required: true 
  },
  quantidade: { 
    type: Number, 
    required: true 
  },
  precoUnitario: { 
    type: Number, 
    required: true 
  }
}, { _id: false });

const VendaSchema = new mongoose.Schema({
  itens: [ItemVenda],
  total: { 
    type: Number, 
    required: true 
  },
  custoTotal: { 
    type: Number, 
    required: true 
  },
  dataVenda: { 
    type: Date, 
    default: Date.now 
  },
  cliente: { 
    type: String 
  }
}, { timestamps: true });

module.exports = mongoose.model('Venda', VendaSchema);
