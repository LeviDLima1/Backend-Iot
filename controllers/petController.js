const { Pet, User } = require('../models');

// Cadastrar novo pet
exports.createPet = async (req, res) => {
  try {
    const { name, breed, age, macId, lastUpdate, isOnline, userId, homeArea, location } = req.body;
    if (!name || !macId || !userId) {
      return res.status(400).json({ error: 'Nome, macId e userId são obrigatórios.' });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    // Validação e formatação dos campos location e homeArea
    let safeLocation = null;
    if (location && typeof location === 'object' && location.lat != null && location.lng != null) {
      safeLocation = { lat: location.lat, lng: location.lng };
    }
    let safeHomeArea = null;
    if (homeArea && typeof homeArea === 'object' && homeArea.lat != null && homeArea.lng != null && homeArea.radius != null) {
      safeHomeArea = { lat: homeArea.lat, lng: homeArea.lng, radius: homeArea.radius };
    }
    const pet = await Pet.create({ name, breed, age, macId, lastUpdate, isOnline, userId, homeArea: safeHomeArea, location: safeLocation });
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar pet.' });
  }
};

// Listar todos os pets
exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.findAll({ include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pets.' });
  }
};

// Listar pets de um usuário
exports.getPetsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const pets = await Pet.findAll({ where: { userId } });
    res.json(Array.isArray(pets) ? pets : []);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pets do usuário.' });
  }
};

// Editar pet
exports.updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (!pet) return res.status(404).json({ error: 'Pet não encontrado.' });
    // No updatePet, garantir que location e homeArea nunca fiquem nulos ou mal formatados
    if (req.body.location && (req.body.location.lat == null || req.body.location.lng == null)) {
      delete req.body.location;
    }
    if (req.body.homeArea && (req.body.homeArea.lat == null || req.body.homeArea.lng == null || req.body.homeArea.radius == null)) {
      delete req.body.homeArea;
    }
    await pet.update(req.body);
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar pet.' });
  }
};

// Excluir pet
exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (!pet) return res.status(404).json({ error: 'Pet não encontrado.' });
    await pet.destroy();
    res.json({ message: 'Pet removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover pet.' });
  }
};

// Buscar pet por ID
exports.getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (!pet) return res.status(404).json({ error: 'Pet não encontrado.' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pet.' });
  }
}; 