const User = require('../models/User');
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).json({'message' : 'Username and password are required'})
    const foundUser = await User.findOne({ username : username}).exec();
    if (!foundUser) return res.status(401).json({'message' : 'User not found'}); // unauthorized user

    // const duplicates = await User.findOne({ username : user}).exec();
    // if (duplicates) return res.sendStatus(409); // conflict
    const match = await bcrypt.compare(password, foundUser.password)
    if (match){
        console.log(`${username} logged in`);
        res.status(200).json(foundUser) 
    }
    else{
        console.log('password not matched');
        res.status(401).json(
            {message : 'Please enter correct password',
        })
    }
}

module.exports = { handleLogin };