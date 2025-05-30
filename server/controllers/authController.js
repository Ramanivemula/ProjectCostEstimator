import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";


export const register = async (req, res)=>{
    const {name, email, password} = req.body;

    if(!name ||!email || !password){
        return res.json({success: false, message: 'Missing Details'});
    }

    try {

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.json({success: false, message: 'User Already exists'});
        }

        const hashedPassword = await bcrypt.hash(password,10);   
        
        const user = new userModel({name, email,password: hashedPassword});

        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token ,{
            httpOnly : true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


export const login = async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, message: 'Email and Password are required'});
    }

    try {
        
        const user = await userModel.findOne({email});

        if(!user){
            return  res.json({success: false, message: 'Invalid email'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return  res.json({success: false, message: 'Invalid Password'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token ,{
            httpOnly : true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true});


    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


export const logout = async (req, res)=>{
    try {
        res.clearCookie('token',{
            httpOnly : true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'strict'

        })

        return res.json({success: true, message:"Logged Out"});
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

//Check if User is authenticated
export const isAuthenticated = async (req, res)=>{

    try {
        return res.json({success: true});;
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}



// Send password reset otp

export const sendResetOtp = async (req, res)=>{
    const {email} = req.body;

    if(!email){
        return res.json({success: false, message: "Email is required"});
    }

    try {
    
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message:"User not found"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP is ${otp}. Use this otp to proceed with resetting your password.`
           
        }
        
        await transporter.sendMail(mailOption);

        return res.json({success: true, message: "Otp sent to your email"});



    } catch (error) {
        res.json({success: false, message: error.message});
    
    }

}


//reset user password

export const resetPassword = async (req, res)=>{
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success: false, message: "Email, OTP and New Password are required"});
    }

    try {
        
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({success: false, message: "Invalid Otp"});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success: false, message: "OTP Expired"});
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        user.password = hashedPassword;

        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        res.json({success: true, message: "Password has been reset successfully"});


    } catch (error) {
        res.json({success: false, message: error.message});

    }

}