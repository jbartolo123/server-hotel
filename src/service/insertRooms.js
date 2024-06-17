const { Room } = require("../db");

const rooms = require("../data/rooms.json");

const insertRecords = require("./insertRecords");

const insertRooms = async () => {
  insertRecords({
    model: Room,
    name: 'rooms',
    data: rooms
  });
};

module.exports = insertRooms;
