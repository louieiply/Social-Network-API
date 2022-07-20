const {User, Thought} = require("../models");

module.exports = {
    //get all users
    getAllUsers(req, res){
        User.find()
            .then((users) => res.json(users))
            .catch((err) => {res.status(500).json(err)});
    },
    //get a user
    getUser(req, res){
        User.findOne({_id: req.params.userId})
        .select("-__v")
        .then((user) =>
            !user ? res.status(404).json({ message: "No user with this id."}) : res.json(user)
        )
        .catch((err) => {res.status(500).json(err)});
    },
    //create a user
    createUser(req, res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {res.json(err)});
    }
}