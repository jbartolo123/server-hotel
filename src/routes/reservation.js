const { Router } = require("express");
const { Room, Reservation } = require("../db");
const changeRoomStatus = require("../controllers/changeRoomStatus");
const reservationRoutes = Router();

reservationRoutes.get("/", async (req,res) => {
    try {
        const reservations = await Reservation.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

reservationRoutes.post("/", async (req,res) => {
  try {
    const { customerName, customerDni, roomId, checkinDate, durationHours } =
      req.body;
    const checkoutDate = new Date(
      new Date(checkinDate).getTime() + durationHours * 60 * 60 * 1000
      // new Date(checkinDate).getTime() + durationHours * 1000
    );
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).send({ message: "Habitación no encontrada" });
    }
    if (room.status !== "DISPONIBLE") {
      return res.status(400).send({ message: "Habitación no disponible" });
    }

    const reservation = await Reservation.create({
      customerName,
      customerDni,
      roomId,
      checkinDate: new Date(checkinDate),
      checkoutDate,
      status: "ACTIVO",
    });
    room.status = "OCUPADO";
    await room.save();
    const durationMs = durationHours * 60 * 60 * 1000;
    // const durationMs = durationHours * 1000;
    changeRoomStatus(roomId, "LIMPIEZA", durationMs);

    res.status(201).json({ message: "Reserva creada con éxito" });
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res.status(500).json({ error: error.message});
  }
});

module.exports = reservationRoutes