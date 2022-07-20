const router = require("express").Router();
const thoughtRoute = require("./thoughtRoute");
const userRoute = require("./userRoute");

router.use("/users", userRoute);
router.use("/thoughts", thoughtRoute);

module.exports = router;
