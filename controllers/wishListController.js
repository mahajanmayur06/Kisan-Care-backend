const express = require('express')
const User = require('../models/User')
const Seed = require('../models/Seed')

exports.addToWishlist = async (req, res) => {
    try {
        const {username, seedName} = req.body
        const user = await User.findOne({ username : username}).exec()
        const seed = await Seed.findOne({ name : seedName}).exec()

        user.wishList.push(seed)
        await User.save()
        return res.json(user.wishList)
    }
    catch(err) {
        return res.json({ message : err.message})
    }
}

exports.getWishlist = async (req, res) => {
    try {
        const {username} = req.params
        const user = await User.findOne({ username : username}).exec()
        return res.json(user.wishList)
    }
    catch(err) {
        return res.json({ message : err.message})
    }
}

exports.deleteFromWishlist = async (req, res) => {
    try {
        const { username, seedName } = req.body;
        const user = await User.findOne({ username }).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const seed = await Seed.findOne({ name: seedName }).exec();
        if (!seed) {
            return res.status(404).json({ message: "Seed not found" });
        }

        const updatedWishlist = user.wishList.filter(item => item.toString() !== seed._id.toString());
        user.wishList = updatedWishlist;
        await user.save();
        console.log("Seed removed from wishlist: ", updatedWishlist );
        return res.json({ message: "Seed removed from wishlist", wishlist: updatedWishlist });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};