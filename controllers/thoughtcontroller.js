const {User, Thought} = require("../models");

module.exports = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {res.status(500).json(err)});
    },
    // Get a thought
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
        .select("-__v")
        .then((thought) =>
            !thought ? res.status(404).json({ message: "No thought with this id."}) : res.json(thought)
        )
        .catch((err) => {res.status(500).json(err)});
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
        .then((thought) => !thought ? res.status(404).json({ message: 'No thought with this id.' }) : res.json(thought)
        )
        .catch((err) => {res.status(500).json(err)} );
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id : req.params.thoughtId})
            .then((thought) => {
                !thought ? res.status(404).json({ message: "No thought with this id."}) : res.json(thought)
            })
            .catch((err) => {res.status(500).json(err)});
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body},
            { runValidators: true, new: true}
        )
        .then((thought) => {
            !thought ? res.status(404).json({ message: "No thought with this id."}) : res.json(thought)
        })
        .catch((err) => {res.status(500).json(err)});
    },
    // add a reaction
    addReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: {reactions: req.body}},
            { runValidators: true, new: true}
        )
        .then((reaction) => {
            !reaction ? res.status(404).json({ message: "No thought with this id."}) : res.json(reaction)
        })
        .catch((err) => {res.status(500).json(err)});
    },
    // remove a reaction
    removeReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: {reactions: req.body.reactionId}},
            { runValidators: true, new: true}
        )
        .then((reaction) => {
            !reaction ? res.status(404).json({ message: "No thought with this id."}) : res.json(reaction)
        })
        .catch((err) => {res.status(500).json(err)});
    },
}