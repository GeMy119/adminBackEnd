import Visit from "../config/connection/model/visit.model.js"
// import { uploadImageToCloudinary } from "../config/upload.js";
import asyncHandler from "express-async-handler"
import { deleteOne, getAll, updateOne } from "./factor.controller.js";
import { uploadImageToCloudinary } from "../config/upload.js";
import bwipjs from 'bwip-js';
// import { v2 as cloudinary } from 'cloudinary';

const updateVisit = updateOne(Visit)
const deleteVisit = deleteOne(Visit)
const getAllVisit = getAll(Visit)

const addVisit = asyncHandler(async (req, res) => {
    const {
        visaNo,
        passportNo,
        code,
        applicationNo,
        birthDate,
        name,
        validFrom,
        validUntil,
        typeOfVisa,
        durationOfStay,
        placeOfIssue,
        entryType,
        nationality,
        purpose,
    } = req.body;

    try {
        // تحقق مما إذا كانت الزيارة موجودة بالفعل
        const existingVisit = await Visit.findOne({ visaNo });
        if (existingVisit) {
            return res.status(409).json({ message: 'Visa with provided properties already exists' });
        }

        // رفع صورة المستخدم إذا كانت موجودة
        let userImageUrl = null;
        if (req.file) {
            console.log('Uploading user image...');
            userImageUrl = await uploadImageToCloudinary(req.file.buffer);
            console.log('User image uploaded successfully:', userImageUrl);
        }

        // توليد صورة الباركود ديناميكيًا
        const barcodeText = `https://api.saudiservices.site/findVisit/${visaNo}`;

        const barcodeImageBuffer = await bwipjs.toBuffer({
            bcid: 'qrcode', // تحديد QR Code للباركود
            text: barcodeText,
            scale: 3,
            width: 50, // عرض صورة الباركود المربعة
            height: 50, // ارتفاع صورة الباركود المربعة
        });

        // رفع صورة الباركود إلى Cloudinary
        console.log('Uploading barcode image...');
        const barcodeImageUrl = await uploadImageToCloudinary(barcodeImageBuffer);
        console.log('Barcode image uploaded successfully:', barcodeImageUrl);

        // إنشاء مستند زيارة جديد
        const newDoc = await Visit.create({
            visaNo,
            passportNo,
            code,
            applicationNo,
            birthDate,
            name,
            validFrom,
            validUntil,
            typeOfVisa,
            durationOfStay,
            placeOfIssue,
            entryType,
            nationality,
            purpose,
            barcodeImage: barcodeImageUrl,
            image: userImageUrl, // يمكن أن تكون null إذا لم يتم رفع صورة المستخدم
        });

        res.status(201).json({ data: newDoc });
    } catch (error) {
        console.error('Error in addVisit:', error);
        res.status(500).json({ message: error.message });
    }
});



const findVisit = asyncHandler(async (req, res) => {
    const { visaNo } = req.params
    const data = await Visit.findOne({ visaNo: visaNo })
    if (data) {
        res.status(200).json({ message: "founded", data })
    }
    res.status(404).json({ message: "document not founded" })
})

export {
    addVisit,
    deleteVisit,
    updateVisit,
    getAllVisit,
    findVisit
}