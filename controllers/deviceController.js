const { Device } = require('../models');

// Criar novo dispositivo
exports.createDevice = async (req, res) => {
  try {
    const device = await Device.create(req.body);
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os dispositivos
exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar dispositivo por ID
exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) return res.status(404).json({ error: 'Dispositivo não encontrado' });
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar dispositivo
exports.updateDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) return res.status(404).json({ error: 'Dispositivo não encontrado' });
    await device.update(req.body);
    res.json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar dispositivo
exports.deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) return res.status(404).json({ error: 'Dispositivo não encontrado' });
    await device.destroy();
    res.json({ message: 'Dispositivo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 