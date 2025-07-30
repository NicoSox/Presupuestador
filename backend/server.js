const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const archivo = path.join(__dirname, 'numero.json');

// GET → devolver el número actual
app.get('/numero', (req, res) => {
  fs.readFile(archivo, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'No se pudo leer el archivo' });
    const json = JSON.parse(data);
    res.json({ numero: json.numeroPresupuesto });
  });
});

// POST → actualizar el número
app.post('/numero', (req, res) => {
  const nuevoNumero = req.body.numero;
  const datos = { numeroPresupuesto: nuevoNumero };
  fs.writeFile(archivo, JSON.stringify(datos, null, 2), (err) => {
    if (err) return res.status(500).json({ error: 'No se pudo guardar el número' });
    res.json({ mensaje: 'Número actualizado' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
