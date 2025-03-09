const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const photoController = require('../controllers/photoController');

router.post('/upload', upload.single('photo'), photoController.uploadPhoto);
router.get('/:userId', photoController.getUserPhotos);
router.delete('/:id', photoController.deletePhoto);

module.exports = router; // CommonJS