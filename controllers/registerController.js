const User = require('../models/User')
const bcrypt = require('bcrypt')
const axios = require('axios')

const handleNewUser = async (req, res) => {
    const { firstName, lastName, email, username, location, password } = req.body;

    try {
        const duplicates = await User.findOne({ username }).exec();
        if (duplicates) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        const soilType = await axios.post('http://localhost:3500/getSoilType', {
            location : location
        })

        const result = await User.create({
            firstName,
            lastName,
            email,
            location,
            soilType : soilType.data, 
            username,
            password: hashedPwd
        });

        console.log(`${result.username} created`);
        console.log(result);

        res.status(201).json({ message: `New user created: ${result.username}` });
    } catch (err) {
        console.error('Error creating new user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { handleNewUser };
