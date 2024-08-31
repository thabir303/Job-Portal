import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        console.log(req.body); // Added this line to debug the request body
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with that email",
                success: false
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            password: hashedPassword,
            role,
            phoneNumber // Ensure this field is being passed correctly
        });
        return res.status(201).json({
            message: `Account created successfully.`,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return req.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: `Incorrect Password`,
                status: false
            });
        };
        if (role !== user.role) {
            return res.status(400).json({
                message: `Account doesn't exist with current role.`,
                status: false,
            });
        };
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: `Logged out successfully`,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        let skillArray;
        if(skills){
            skillArray = skills.split(",");     
        }
        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);

        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillArray;

        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };
        return res.status(200).json({ // Changed status code to 200
            message: "Profile updated successfully",
            user,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};
