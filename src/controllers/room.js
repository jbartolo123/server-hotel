const { Room } = require("../db");

const getRooms = async () => {
  const rooms = await Room.findAll();
  return rooms;
};


module.exports = { getRooms };