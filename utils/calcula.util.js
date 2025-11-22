function calcularCustoEncomenda(insumosNecessarios, qtdEncomendas = 1) {
  let custo = 0;
  for (const item of insumosNecessarios) {
    const custoPorUnidade = (item.insumo && item.insumo.custoPorUnidade) ? item.insumo.custoPorUnidade : 0;
    custo += custoPorUnidade * item.quantidade * qtdEncomendas;
  }
  return custo;
}

module.exports = { calcularCustoEncomenda };
