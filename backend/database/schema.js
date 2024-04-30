const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:[true, "Please provide your email"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required:[true, "Please provide password"],
        trim:true,
        minLength:6,
    },
    firstName: {
        type: String,
        required:[true, "please provide your first name"],
        trim: true,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: [true, "Please provide your last name"],
        maxLength: 30,
    }
});

const User = mongoose.model("User", userSchema);

const balanceSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true]
    },
    balance:{
        type: Number,
        required: true,
    }
});

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = { User, Balance };