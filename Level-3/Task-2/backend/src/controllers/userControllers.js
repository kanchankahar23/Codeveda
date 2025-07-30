const UserModel = require("../models/User")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const registerUser = async (req, res) => {
    const {username, email, password} = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const userExists = await UserModel.findOne({email})
    if(userExists){
        return res.status(400).json({
            message: "user already exists"
        })
    }

     try {
        const user = await UserModel.create({
            username,
            email,
            password, 
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;


    const user = await UserModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' }); 
    }
};

const getUserProfile = async (req, res) => {
    res.json({
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};