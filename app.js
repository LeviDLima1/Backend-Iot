require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

require('./config/sync');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rotas
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api', deviceRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API rodando!' });
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// --- WEBSOCKET ---
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Novo cliente WebSocket conectado');
}); 