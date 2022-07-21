const router = require("express").Router();
const { Error } = require("mongoose");
const {getAllThoughts, getThought, createThought, deleteThought, updateThought, addReaction, removeReaction} = require("../../controllers/thoughtcontroller");

// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getThought).delete(deleteThought).put(updateThought);

// /api/thoughts/reactions
router.route("/:thoughtId/reactions").post(addReaction).delete(removeReaction);

module.exports = router;
