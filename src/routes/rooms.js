const { Router } = require("express");
const { getRooms } = require("../controllers/room");
const { Room } = require("../db");
const { where } = require("sequelize");
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
    res.status(400).json({ error: error.message });
  }
});

roomRoutes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body
    await Room.update(
      {image:image},
      {
        where:{
          id
        }
      }
    )
    res.status(200).json({ hecho:true });
 
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
})

roomRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRoom = await Room.destroy({ where: { id: id } });
    res.status(200).json(deleteRoom);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = roomRoutes;
