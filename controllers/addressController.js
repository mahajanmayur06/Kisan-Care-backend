const User = require('../models/User')
const Address = require('../models/Address')

exports.addAddress = async (req, res) => {
    try {
        const address = await Address.create({
            username : req.body.username,
            address_line1 : req.body.address_line1,
            address_line2 : req.body.address_line2,
            city : req.body.city,
            state : req.body.state,
            postal_code : req.body.postal_code,
            phone_number : req.body.phone_number
        })
        console.log(address);
        res.status(201).json({ message : 'Address addded'})
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message : 'Internal server error'})
    }
}