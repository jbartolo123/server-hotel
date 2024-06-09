const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/userControllers');

const userRoutes = Router();

userRoutes.get("/", async (req,res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({error: error.message})  
    }
})

userRoutes.post("/", async (req,res) => {
    try {
        const data = req.body;
        const newUser = await createUser(data)

        res.status(200).json(newUser)
    } catch (error) {
        res.status(404).json({error: error.message})    
    }
})


module.exports = userRoutes;