const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const locationController = require('../controllers/locationController');

router.post('/', petController.createPet);
router.get('/', petController.getPets);
router.get('/user/:userId', petController.getPetsByUser);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);
router.get('/:id', petController.getPetById);

// Rota para receber localização da coleira
router.post('/locations/receive', locationController.receiveLocation);

// Rota para buscar histórico de localizações de um pet
router.get('/:petId/locations', locationController.getLocationHistory);

module.exports = router; 