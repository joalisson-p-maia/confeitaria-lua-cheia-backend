
# 📗 **README – Backend (Node.js + Express + MongoDB) – Confeitaria Lua Cheia**

```markdown
 🍰 Confeitaria Lua Cheia - Backend  
API desenvolvida em **Node.js + Express + MongoDB**, responsável pelo controle de insumos, encomendas, vendas, estoque e balanço mensal.

---

 🚀 Tecnologias Utilizadas
- **Node.js**
- **Express 5**
- **MongoDB**
- **Mongoose**
- **bcrypt**
- **dotenv**

---

 📦 Instalação
npm install

```

-----

## Como iniciar o servidor?
#### npm start

-----

## Rotas

```javascript
📌 Vendas
router.get("/listar", VendaController.listar);
router.get("/listar/vendasPorMes", VendaController.listarPorMes);
router.get("/buscar/:id", VendaController.buscarPorId);
router.post("/criar", VendaController.criar);

📌 Encomendas
router.get("/listar", EncomendaController.listar);
router.get("/buscar/:id", EncomendaController.buscarPorId);
router.post("/criar", EncomendaController.criar);
router.put("/editar/:id", EncomendaController.atualizar);
router.delete("/deletar/:id", EncomendaController.remover);

📌 Insumos
router.get("/listar", InsumoController.listar);
router.get("/buscar/:id", InsumoController.buscarPorId);
router.post("/criar", InsumoController.criar);
router.put("/editar/:id", InsumoController.atualizar);
router.delete("/deletar/:id", InsumoController.remover);

🔄 Movimentação de Estoque
router.post("/movimentacao", async (req, res) => {
  const { nome, tipo, quantidade } = req.body;

  const insumo = await Insumo.findOne({ nome });
  if (!insumo) return res.status(404).json({ message: "Insumo não encontrado" });

  if (tipo === "entrada") insumo.quantidade += Number(quantidade);
  if (tipo === "saida") insumo.quantidade = Math.max(0, insumo.quantidade - Number(quantidade));

  await insumo.save();
  res.json(insumo);
});
```