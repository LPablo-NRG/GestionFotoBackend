require('dotenv').config(); // <-- Agrega esta línea al inicio
const request = require("supertest");
const mongoose = require("mongoose");
const path = require("path");
const app = require('../src/server'); 

let uploadedPhotoId = '';
const userId = "12345";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Tests - Gestión de Fotos', () => {
  test("POST /api/photos/upload - Debería subir una foto", async () => {
    const res = await request(app)
      .post("/api/photos/upload")
      .field("userId", userId)
      .attach("photo", path.join(__dirname, "test.jpg")); 

    uploadedPhotoId = res.body.photo._id;
    expect(res.statusCode).toBe(201);
  }, 10000);

  test("GET /api/photos/:userId - Debería obtener fotos del usuario", async () => {
    const res = await request(app).get(`/api/photos/${userId}`);
    expect(res.statusCode).toBe(200);
  });

  test("DELETE /api/photos/:id - Debería eliminar la foto", async () => {
    const res = await request(app).delete(`/api/photos/${uploadedPhotoId}`);
    expect(res.statusCode).toBe(200);
  });
});