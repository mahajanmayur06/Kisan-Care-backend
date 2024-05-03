const express = require('express')
const User = require('../models/User')
const Seed = require('../models/Seed')
const Fertilizer = require('../models/Fertilizer');
const Pesticide = require('../models/Pesticide');

exports.addToWishlist = async (req, res) => {
    try {
        const {username, name, type} = req.body
        const user = await User.findOne({ username : username}).exec()
        let item;

        if (type === 'seed') {
            item = await Seed.findOne({ name });
        } else if (type === 'fertilizer') {
            item = await Fertilizer.findOne({ name });
        } else {
            item = await Pesticide.findOne({ name });
        }

        if (!user) {
            return res.status(404).json({ message : 'User not found'})
        }

        if (!item) {
            return res.status(404).json({ message : 'Item not found'})
        }
        const hasItem = user.wishList.filter(cartItem => cartItem.itemName === item.name);
        if (hasItem.length > 0) {
            return res.status(304).json({message : 'Already added to the wishlist'})
        }
        user.wishList.push({
            itemName : name,
            type : type
        })
        await user.save()
        console.log('added to wishlist');
        return res.json(user.wishList)
    }
    catch(err) {
        return res.status(500).json({ message : err.message})
    }
}

exports.getWishlist = async (req, res) => {
    try {
        const username = req.query.username
        const user = await User.findOne({ username : username}).exec()
        if (user.wishList.length === 0) {
            return res.json({ message : 'Your wishlist is empty'})
        }
        const wishlists = [];
        let item;
        for (const cartItem of user.wishList) {
            if (cartItem.type == 'seed') {
                item = await Seed.findOne({ name : cartItem.itemName});
                if (item) {
                    wishlists.push({
                        name : item.name, 
                        seedType : item.type, 
                        price : item.price,
                        type : cartItem.type
                    });
                }
            }
            else if (cartItem.type == 'fertilizer') {
                item = await Fertilizer.findOne({ name : cartItem.itemName });
                if (item) {
                    wishlists.push({
                        name : item.name, 
                        price : item.price,
                        discription : item.disc,
                        type : cartItem.type
                    });
                }
            }
            else {
                item = await Fertilizer.findOne({ name : cartItem.itemName });
                if (item) {
                    wishlists.push({
                        name : item.name, 
                        price : item.price,
                        discription : item.disc,
                        type : cartItem.type
                    });
                }
            }
        }
        res.status(200).json(wishlists)
    }
    catch(err) {
        return res.json({ message : err.message})
    }
}

exports.deleteFromWishlist = async (req, res) => {
    try {
        const { username, name, type } = req.body;

        const user = await User.findOne({ username : username }).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        let item;

        if (type === 'seed') {
            item = await Seed.findOne({ name });
        } else if (type === 'fertilizer') {
            item = await Fertilizer.findOne({ name });
        } else {
            item = await Pesticide.findOne({ name });
        }

        user.wishList = user.wishList.filter(item => item.itemName !== name);
        await user.save();
        
        console.log("Seed removed from wishlist");
        return res.status(200).json({ message : `${name} removed from wishlist`, wishList : user.wishList});
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
        console.log('Wishlist cleared');
        return res.json({ message: 'Wish list cleared successfully' });
    } catch (error) {
        console.error('Error clearing wish list:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
