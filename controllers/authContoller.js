const User = require('../models/User');
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const {username, password} = req.query;
    
    if (!username || !password){
        throw new Error('All fields are mandatory')
    }
    const foundUser = await User.findOne({ username : username}).exec();
    if (!foundUser) {
        throw new Error('User not found...')// unauthorized user
    }

    // const duplicates = await User.findOne({ username : user}).exec();
    // if (duplicates) return res.sendStatus(409); // conflict
    const match = await bcrypt.compare(password, foundUser.password)
    if (match){
        console.log(`${username} logged in`);
        res.status(200).json(foundUser) 
    }
    else{
        console.log(`password not matched for ${username}`);
        throw new Error('Enter correct password...')
    }
}

module.exports = { handleLogin };