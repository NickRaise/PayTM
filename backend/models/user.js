const mongoose = require("mongoose")

// My original naive code
// const userSchema = new mongoose.Schema({
//     first_name: String,
//     last_name: String,
//     username: String,
//     password: String,
// })

const DB_URL = ''
async function connect_dp() {
    await mongoose.connect('DB_URL')
}

connect_dp().catch(err => console.log(err))

//Elegant way of writing code
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 12
    },

    first_name: {
        type: String,
        required: True,
        trim: true,
        maxLength: 20,
    },

    last_name: {
        type: String,
        required: True,
        trim: true,
        maxLength: 20,
    }
})

const accountSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,  // mongoDB id type
        ref: 'userSchema',
        required: true,
    },
    balance: {
        type: number,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)