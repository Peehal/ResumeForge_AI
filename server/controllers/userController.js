import bcrypt from 'bcrypt'
import User from "../models/User.js"
import jwt from "jsonwebtoken"


const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {})
}

// controller for user registration
// /POST: /api/user/register

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.Create({
            name, email, password:hashedPassword
        })

        // return success message
        const token = generateToken(newUser._id);
        newUser.password=undefined;

        return res.status(201).json({message:'user createe successfully', token, user:newUser})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }

}

// controller for user login
// /POST: /api/user/login

export const loginUser = async (req, res) => {
    try {
        const {email, password } = req.body;
        

        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' })
        }

        if(!user.comparepassword(password)){
            return res.status(400).json({message:`invalid email or password`})
        }

        // return success message
        const token = generateToken(user._id);
        user.password=undefined;

        return res.status(201).json({message:'Login successful', token, user})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}


// controller to get user by ID
// GET: /api/users/data

export const getUserById = async (req, res) => {
    try {
        // userId will come through middleware
        const userId = req.userId;
        
        const user = await User.findById(userId)

        if(!user){
            return res.status(400).json({message:`User not found`})
        }

        // return success message
        const token = generateToken(user._id);
        user.password=undefined;

        return res.status(201).json({message:'Login successful', token, user})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}