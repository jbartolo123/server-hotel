const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
      "Reservation",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerDni: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        checkinDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        checkoutDate: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          status: { 
            type: DataTypes.ENUM('ACTIVO', 'COMPLETADO'),
            allowNull: false,
            defaultValue: 'ACTIVO',
          },
      },
      { freezeTableName: true, timestamps: false }
    );
  };
  