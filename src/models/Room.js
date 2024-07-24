const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Room",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roomType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("DISPONIBLE", "OCUPADO","LIMPIEZA"),
        allowNull: false,
        defaultValue: "DISPONIBLE",
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "https://static.abc.es/Media/201504/27/hotel12--644x362.jpg"
      }
    },
    { freezeTableName: true, timestamps: false }
  );
};
