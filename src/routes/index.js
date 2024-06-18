const { Router } = require("express");

const userRoutes = require("./userRoutes");
const roomRoutes = require("./rooms")
const reservationRoutes = require("./reservation")

const router = Router();

router.use("/users",userRoutes)
router.use("/rooms",roomRoutes)
router.use("/reservation",reservationRoutes)

module.exports = router;