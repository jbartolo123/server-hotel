const { User } = require("../db");

const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

const createUser = async ({ username, password }) => {
  if (!username || !password) throw Error("Missing data");
  const users = await User.findAll();
  const userExists = users.some(user => user.username === username);
  if (userExists) throw new Error("Ya existe el usuario");
  const newUser = await User.create({username, password})
  return newUser
};

module.exports = { getUsers, createUser };
