import Admin from "../config/connection/model/admin.model.js";
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import { createOne, deleteOne } from "./factor.controller.js";

const register = createOne(Admin)
const deleteAdmin = deleteOne(Admin)
const login = asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const admin = await Admin.findOne({ userName });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
        return res.status(400).json({ message: "Incorrect data" });
    }
    res.status(200).json({ message: "Welcome" });

});
export { register, deleteAdmin, login }