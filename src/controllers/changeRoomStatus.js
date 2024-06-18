const { Room } = require("../db")

const changeRoomStatus = (roomId, newStatus, delay) => {
    setTimeout(async () => {
      const room = await Room.findByPk(roomId);
      if (room) {
        room.status = newStatus;
        await room.save();
        if (newStatus === 'Limpieza') {
          // Programar cambio de Limpieza a Disponible después de 45 minutos
          changeRoomStatus(roomId, 'Disponible', 45 * 60 * 1000);
          // changeRoomStatus(roomId, 'Disponible', 60 * 1000);
        }
      }
    }, delay);
  };

  module.exports = changeRoomStatus