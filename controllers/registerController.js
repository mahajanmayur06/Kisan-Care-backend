const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Username, password, and email are required' });
    }

    const duplicates = await User.findOne({ username }).exec();

    if (duplicates) {
        return res.status(409).json({ message: "Username already exists" });
    }

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const userArray = await User.find({});
        const lastUser = userArray.slice(-1)[0];
        const id = lastUser ? lastUser.id + 1 : 1;

        const result = await User.create({
            id: id,
            email: email,
            username: username,
            password: hashedPwd
        });

        console.log(`${result.username} created`);
        console.log(result);

        return res.status(201).json({ message: `New user created: ${result.username}` });
    } catch (err) {
        console.error('Error creating new user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { handleNewUser };
