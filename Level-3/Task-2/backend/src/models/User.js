const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add a username'],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,  //regex
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
    },
    {
        timestamps: true,
    }
);


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel