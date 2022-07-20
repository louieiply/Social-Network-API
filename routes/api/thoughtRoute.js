const router = require("express").Router();
const {getAllThoughts, getThought, createThought, deleteThpught, updateThought} = require("../../controllers/thoughtcontroller");

// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:userId").get(getThought).delete(deleteThpught).put(updateThought);

module.exports = router;
