// index.js
import express from 'express';     // se usar "type": "module" no package.json
// ou: const express = require('express');  // caso prefira CommonJS

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender JSON
app.use(express.json());

// Rota POST simples
app.post('/transacao', (req, res) => {
  const dataRecebido = req.body;   // contém tudo que o cliente enviou no JSON
  console.log('Recebido:', dataRecebido);

  // Retorna resposta padronizada
  res.status(200).json({ status: 'APPROVED' });
});

// Start
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
