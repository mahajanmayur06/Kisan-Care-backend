const express = require('express')
const User = require('../models/User')
const Seed = require('../models/Seed')

exports.addToWishlist = async (req, res) => {
    try {
        const {username, seedName} = req.body
        const user = await User.findOne({ username : username}).exec()
        const seed = await Seed.findOne({ name : seedName}).exec()

        if (!seed) {
            return res.status(404).json({ message : 'Seed not found'})
        }
        if (!user) {
            return res.status(404).json({ message : 'User not found'})
        }
        const hasItem = user.wishList.filter(cartItem => cartItem.equals(seed._id));
        if (hasItem.length > 0) {
            return res.status(304).json({message : 'Already added to the wishlist'})
        }
        user.wishList.push({
            seedName : seedName
        })
        await user.save()
        return res.json(user.wishList)
    }
    catch(err) {
        return res.stautus(500).json({ message : err.message})
    }
}

exports.getWishlist = async (req, res) => {
    try {
        const username = req.query.username
        const user = await User.findOne({ username : username}).exec()
        if (user.wishList.length === 0) {
            return res.json({ message : 'Your wishlist is empty'})
        }
        const wishList = []
        for (item of user.wishList) {
            const seedItem = await Seed.findOne({ name : item.seedName}).exec()
            if (!seedItem) return res.status(404).json({ message : 'kya kar raha hai bhai '})
            wishList.push({
                seedName : seedItem.name,
                seedType : seedItem.type,
                seedPrice : seedItem.price,
                seedImage : seedItem.image,
                seedSeason : seedItem.season
            })
        }
        res.status(200).json(wishList)
    }
    catch(err) {
        return res.json({ message : err.message})
    }
}

exports.deleteFromWishlist = async (req, res) => {
    try {
        const { username, seedName } = req.body;

        const user = await User.findOne({ username : username }).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const seed = await Seed.findOne({ name : seedName}).exec()
        user.wishList = user.wishList.filter(item => item.seedName !== seedName);
        await user.save();
        
        console.log("Seed removed from wishlist:\n", user.wishList);
        return res.status(200).json({ message : `${seedName} removed from wishlist`, wishList : user.wishList});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



exports.clearWishList = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: `User ${username} not found` });
        }

        user.wishList = []; // Set wishList to an empty array
        await user.save(); // Save changes

        return res.json({ message: 'Wish list cleared successfully' });
    } catch (error) {
        console.error('Error clearing wish list:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
