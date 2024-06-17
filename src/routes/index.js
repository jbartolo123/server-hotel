const { Router } = require("express");

const userRoutes = require("./userRoutes");
const roomRoutes = require("./rooms")

const router = Router();

router.use("/users",userRoutes)
router.use("/rooms",roomRoutes)

module.exports = router;