import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timeStamps: true
})

const User = mongoose.model('User', userSchema)

export default User