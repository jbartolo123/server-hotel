const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("User",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: 'The name is required',
                }
              }
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: 'The password is required',
                }
              }
        }
    },{freezeTableName: true, timestamps:false})
}