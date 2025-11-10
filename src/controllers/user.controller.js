import express from "express";
import authConfigs from "../config/auth.config.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const userRegister = async (req, res) => {
    try {
        const { name, phoneNumber, email, password } = req.body;
        const user = await User.create({ name, phoneNumber, email, password });

        res.status(201).json({
            success: true,
            message: "User Created Successfully.",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Somthing Went Wrong.",
            error: error,
        });
    }
};


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, massage: "Failed To Login" });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(404).json({ success: false, massage: "Failed To Login" });
        } else {
            const token = authConfigs.encodeToken(user.email, user._id.toString());

            res.cookie("user-token", token);
            res.status(200).json({ success: true, message: "Successfully Loggedin", user: { id: user._id, email: user.email, }, token: token, });
        }

    } catch (error) {
        res.status(200).json({
            success: false,
            error: error.toString(),
            message: "Somthing Went Wrong.",
        });
    }
};


const userControllers = { userRegister, userLogin };
export default userControllers;