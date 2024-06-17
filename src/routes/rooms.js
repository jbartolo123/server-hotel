const { Router } = require("express");
const { getRooms } = require("../controllers/room");
const { Room } = require("../db");
const roomRoutes = Router();

roomRoutes.get("/", async (req, res) => {
  try {
    const rooms = await getRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

roomRoutes.post("/", async (req, res) => {
  try {
    const data = req.body;
    Room.bulkCreate(data, { ignoreDuplicates: true });
    res.status(200).json({ hecho: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

roomRoutes.post("/create", async (req, res) => {
  try {
    const data = req.body;
    Room.create(data);
    res.status(200).json({ hecho: true });
  } catch (error) {
    res.status(400).json({error : error.message})
  }
});

module.exports = roomRoutes;
