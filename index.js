require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/ConnectDB');

const app = express();
app.use(cors());
app.use(express.json());

conectaDB();

const insumoRoutes = require('./routes/insumo.route');
const encomendaRoutes = require('./routes/encomenda.route');
const vendaRoutes = require('./routes/venda.route');
const estoqueRoutes = require('./routes/estoque.route');
const balancoRoutes = require('./routes/balanco.route');

app.use('/api/insumos', insumoRoutes);
app.use('/api/encomendas', encomendaRoutes);
app.use('/api/vendas', vendaRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/balanco', balancoRoutes);

app.get('/', (req, res) => res.json({ message: 'API Confeitaria funcionando 🍰' }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
