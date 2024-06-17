const insertRooms = require("./insertRooms");

const insertData = async () => {
    await insertRooms()
};

module.exports = insertData