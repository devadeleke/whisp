import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../lib/utils.js';
import { sendWelcomeEmail } from '../email/emailHandler.js';
import { ENV } from '../lib/env.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        if(!fullname || !email || !password) return res.status(400).json({ message: 'All fields are required' });
        if(password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });

        //check if user already exist
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({ message: 'User already exist' });

        //hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        //create user
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        if(newUser) {
            const savedUser = await newUser.save();
            generateTokenAndSetCookie(savedUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePicture: newUser.profilePicture
            });
            
            try {
                await sendWelcomeEmail(newUser.email, newUser.fullname, ENV.CLIENT_URL);
            } catch (error) {
                console.error('Error sending welcome email:', error);
            }
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) return res.status(400).json({ success: false, message: "All fields should be provided..."})
        
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ success: false, message: "Invalid credentials..."})

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if(!isPasswordValid) return res.status(400).json({success: false, message: "Invalid credentials..."})

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true, message: "User successfully logged out."})
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePicture } = req.body;
        if (!profilePicture) return res.status(400).json({ message: 'Profile picture URL is required' });

        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePicture)

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { profilePicture: uploadResponse.secure_url }, 
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        
        res.status(200).json({ 
            success: true, 
            message: 'Profile updated successfully', 
            user: updatedUser 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}