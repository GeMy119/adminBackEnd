import User from "../config/connection/model/user.model.js";
import asyncHandler from "express-async-handler"
import ApiError from "../utils/apiError.js";
import { deleteOne, getAll, updateOne } from "./factor.controller.js";
import { uploadImageToCloudinary } from "../config/upload.js";

// const addUser = createOne(User)
const updateUser = updateOne(User)
const deleteUser = deleteOne(User)
const getAllUsers = getAll(User)
const addUser = asyncHandler(async (req, res) => {
    let newDoc;
    const {
        IdNumber,
        outgoingNumber,
        transactionNumber,
        userOccupation,
        userSerialNumber,
        name,
        releaseDate,
        dateBoking,
        WifeSerialNumber,
        wifeName,
        type,
        condition,
        nationality,
        occupationCategory
    } = req.body;
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ IdNumber });
        if (existingUser) {
            return res.status(409).json({ message: 'User with provided properties already exists' });
        }
        let imageUrl = null;
        if (req.file) {
            console.log('File received:', req.file); // Logging received file
            imageUrl = await uploadImageToCloudinary(req.file.buffer); // use buffer instead of path
        }
        // Check if a user with the provided properties already exists
        // Create the document with or without the image URL
        newDoc = await User.create({
            IdNumber,
            outgoingNumber,
            transactionNumber,
            userOccupation,
            userSerialNumber,
            name,
            releaseDate,
            dateBoking,
            WifeSerialNumber,
            wifeName,
            type,
            condition,
            nationality,
            image: imageUrl, // imageUrl could be null if no image was uploaded
            occupationCategory
        });
        res.status(201).json({ data: newDoc });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



const findMariagePermit = asyncHandler(async (req, res) => {
    const { idNumber, outgoingNumber } = req.params
    const data = await User.findOne({ IdNumber: idNumber, outgoingNumber })
    if (data) {
        res.status(200).json({ message: "founded", data })
    }
    res.status(404).json({ message: "document not founded" })
})
const inquireAboutATransaction = asyncHandler(async (req, res) => {
    const { transactionNumber } = req.body
    const data = await User.findOne({ transactionNumber: transactionNumber })
    if (data) {
        res.status(200).json({ message: "founded", data })
    }
    res.status(404).json({ message: "document not founded" })
})
export {
    addUser,
    updateUser,
    deleteUser,
    findMariagePermit,
    getAllUsers,
    inquireAboutATransaction
}