const router = require("express").Router();
const thoughtRoute = require("./thoughtRoute");
const userRoute = require("./userRoute");
// api/users
router.use("/users", userRoute);
// api/thoughts
router.use("/thoughts", thoughtRoute);

module.exports = router;
