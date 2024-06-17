require("dotenv").config();
const { Sequelize } = require("sequelize");
// const { DB_DEPLOY } = process.env;
const DB_DEPLOY="postgresql://postgres:TdosLIwswwnpCfOhhapJHBJhowLASduL@roundhouse.proxy.rlwy.net:49908/railway"
// const DB_DEPLOY= "postgres://postgres:jbh@localhost:5432/hotel"
const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
  alter: false,
  dialectModule: require('pg')
});

const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const { User, Room } = sequelize.models;

Room['dataExist'] = async () => {
  const amountData = await model.count()
  return amountData > 0
}

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
