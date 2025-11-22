function handleError(res, err) {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message, details: err.errors });
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Dado duplicado', error: err.keyValue });
  }
  return res.status(500).json({ message: err.message || 'Erro interno no servidor' });
}

module.exports = { handleError };
