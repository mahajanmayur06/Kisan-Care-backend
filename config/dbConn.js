const mongoose = require('mongoose')

const dbConn = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    }
    catch (err){
        console.log(err);
    }
}

module.exports = dbConn