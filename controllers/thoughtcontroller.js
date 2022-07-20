const {User, Thought} = require("../models");

module.exports = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {res.status(500).json(err)});
    },
    //get a thought
    getThought(req, res) {
        Thought.findOne({ _id: req.params.userId})
        .select("-__v")
        .then((thought) =>
            !thought ? res.status(404).json({ message: "No thought with this id."}) : res.json(thought)
        )
        .catch((err) => {res.status(500).json(500)});
    },
    // Create a thought that's attached to a user
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findByIdAndUpdate(
                { _id: req.body.userId},
                { $push: {thoughts: thought._id}},
                { runValidators: true, new: true},
            );
        })
        .catch((err) => {res.status(500).json(err)} );
    },
    // Delete a thought
    deleteThpught(req, res) {
        Thought.findOneAndDelete({_id : req.params.thoughtId})
            .then((thought) => {
                !thought ? res.status(404).json({ message: "No thought with this id."}) : res.json(thought)
            })
            .catch((err) => {res.status(500).json(err)});
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.param.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({ message: "no thought with this id."}) : res.json(thought)
        })
        .catch((err) => {res.status(500).json(err)});
    },
}