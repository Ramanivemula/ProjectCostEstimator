const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const RegisterUser = async(req,res) => {
    const {name,email,password} = req.body;
    try {
        const userExist =await User.findOne({email});
        if(userExist) {
            return res.status(400).json({message: 'User Already Exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "10d"});
        res.json(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            message: 'User Created Successfully'
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const LoginUser = async(req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid Email'});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: 'Invalid Password'});
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "10d"});
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            message: 'User Login Successfully'
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {RegisterUser,LoginUser};