const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadPhoto, getUserPhotos, deletePhoto } = require("../controllers/photoController");

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/"); // La carpeta "uploads" debe existir
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// Definir rutas
router.post("/upload", upload.single("photo"), uploadPhoto); // POST /api/photos/upload
router.get("/:userId", getUserPhotos); // GET /api/photos/:userId
router.delete("/:id", deletePhoto); // DELETE /api/photos/:id

module.exports = router;