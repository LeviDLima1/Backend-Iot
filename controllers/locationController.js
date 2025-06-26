const { Pet, Location } = require('../models');

// Função para calcular a distância Haversine em metros
function calcularHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Raio da Terra em metros
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Recebe localização da coleira e atualiza o pet correspondente
exports.receiveLocation = async (req, res) => {
  try {
    const deviceId = req.header('X-Device-ID');
    const { latitude, longitude } = req.body;

    if (!deviceId || !latitude || !longitude) {
      return res.status(400).json({ message: 'Dados insuficientes.' });
    }

    // Busca o pet pelo macId
    const pet = await Pet.findOne({ where: { macId: deviceId } });
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado para este deviceId.' });
    }

    // Atualiza o campo location do pet
    pet.location = { lat: latitude, lng: longitude, updatedAt: new Date() };
    pet.lastUpdate = new Date().toISOString();
    pet.isOnline = true;
    await pet.save();

    // Salva no histórico de localizações
    await Location.create({
      petId: pet.id,
      latitude,
      longitude,
      timestamp: new Date(),
    });

    // Lógica de geocerca no backend
    let zonaStatus = 'Sem zona segura';
    let distancia = null;
    if (pet.homeArea && pet.homeArea.lat != null && pet.homeArea.lng != null && pet.homeArea.radius != null) {
      distancia = calcularHaversine(latitude, longitude, pet.homeArea.lat, pet.homeArea.lng);
      if (distancia > pet.homeArea.radius) {
        zonaStatus = 'Fora da Zona Segura';
        return res.json({ message: 'Fora da Zona Segura', distancia: distancia });
      } else {
        zonaStatus = 'Dentro da Zona Segura';
        return res.json({ message: 'Dentro da Zona Segura', distancia: distancia });
      }
    } else {
      return res.json({ message: 'Localização recebida, mas zona segura não cadastrada.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao processar localização.' });
  }
};

// Endpoint para buscar o histórico de localizações de um pet
exports.getLocationHistory = async (req, res) => {
  try {
    const { petId } = req.params;
    const locations = await Location.findAll({
      where: { petId },
      order: [['timestamp', 'DESC']],
    });
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar histórico de localizações.' });
  }
}; 