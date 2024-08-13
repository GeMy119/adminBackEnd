import User from "../config/connection/model/user.model.js";
import asyncHandler from "express-async-handler"
import ApiError from "../utils/apiError.js";
import { deleteOne, getAll, updateOne } from "./factor.controller.js";
import { uploadImageToCloudinary } from "../config/upload.js";
import useragent from "useragent"
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
            return res.status(409).json({ message: 'User with provided properties already exists', existingUser });
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
    if (!data) {
        new ApiError("document not founded", 404)
    }
    // تحليل User-Agent
    const agent = useragent.parse(req.headers['user-agent']);
    // استخراج معلومات الجهاز
    const deviceInfo = {
        os: agent.os.toString(),           // نظام التشغيل
        device: agent.device.toString(),   // الجهاز
        browser: agent.toAgent(),  // المتصفح
        datetime: new Date().toISOString() // التاريخ والوقت


    };
    const deviceInfoString = JSON.stringify(deviceInfo);
    // تحديث المعلومات وتحديث عدد مرات البحث
    data.searchCountMerage += 1;
    data.deviceMerageSearch = deviceInfoString;

    // التحقق من أن التحديثات تم تطبيقها
    console.log('Updated user:', data);

    // حفظ المستند بعد التعديلات
    await data.save();

    res.status(200).json({ message: "founded", data })


})
const inquireAboutATransaction = asyncHandler(async (req, res) => {
    const { transactionNumber } = req.body
    const data = await User.findOne({ transactionNumber: transactionNumber })
    if (!data) {
        new ApiError("document not founded", 404)
    }
    // تحليل User-Agent
    const agent = useragent.parse(req.headers['user-agent']);
    // استخراج معلومات الجهاز
    const deviceInfo = {
        os: agent.os.toString(),           // نظام التشغيل
        device: agent.device.toString(),   // الجهاز
        browser: agent.toAgent(),  // المتصفح
        datetime: new Date().toISOString() // التاريخ والوقت
    };
    const deviceInfoString = JSON.stringify(deviceInfo);
    // تحديث المعلومات وتحديث عدد مرات البحث
    data.searchCountTransaction += 1;
    data.deviceTransactionSearch = deviceInfoString;

    // التحقق من أن التحديثات تم تطبيقها
    console.log('Updated user:', data);

    // حفظ المستند بعد التعديلات
    await data.save();
    res.status(200).json({ message: "founded", data })
})

const findUser = asyncHandler(async (req, res) => {
    const { idNumber } = req.params
    const data = await User.findOne({ IdNumber: idNumber })
    if (!data) {
        new ApiError("document not founded", 404)
    }
    res.status(200).json({ message: "founded", data })
})
export {
    addUser,
    updateUser,
    deleteUser,
    findMariagePermit,
    getAllUsers,
    inquireAboutATransaction,
    findUser
}