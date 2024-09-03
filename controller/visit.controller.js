import Visit from "../config/connection/model/visit.model.js"
import asyncHandler from "express-async-handler"
import { deleteOne, getAll, updateOne } from "./factor.controller.js";
import { uploadImageToCloudinary } from "../config/upload.js";
import bwipjs from 'bwip-js';
import useragent from "useragent"

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
        const existingVisit = await Visit.findOne({ visaNo });
        if (existingVisit) {
            return res.status(409).json({ message: 'Visa with provided properties already exists', existingVisit });
        }

        let userImageUrl = null;
        if (req.file) {
            console.log('Uploading user image...');
            userImageUrl = await uploadImageToCloudinary(req.file.buffer);
            console.log('User image uploaded successfully:', userImageUrl);
        }

        // إنشاء رابط يتطابق مع صفحة `visit-show` في الـ front-end
        const frontendLink = `https://suadiestalamsurvices.com/visit-show?visaNo=${visaNo}`;
        const barcodeImageBuffer = await bwipjs.toBuffer({
            bcid: 'qrcode', // تحديد QR Code للباركود
            text: frontendLink,
            scale: 3,
            width: 50,
            height: 50,
        });

        console.log('Uploading barcode image...');
        const barcodeImageUrl = await uploadImageToCloudinary(barcodeImageBuffer);
        console.log('Barcode image uploaded successfully:', barcodeImageUrl);

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
            image: userImageUrl,
        });

        res.status(201).json({ data: newDoc });
    } catch (error) {
        console.error('Error in addVisit:', error);
        res.status(500).json({ message: error.message });
    }
});




const findVisit = asyncHandler(async (req, res) => {
    const { visaNo } = req.params || req.query
    const data = await Visit.findOne({ visaNo: visaNo })

    if (!data) {
        return res.status(404).json({ message: "document not founded" });
    }

    // تحليل User-Agent
    const agent = useragent.parse(req.headers['user-agent']);

    // استخراج معلومات الجهاز
    const deviceInfo = {
        os: agent.os.toString(),           // نظام التشغيل
        device: agent.device.toString(),   // الجهاز
        browser: agent.toAgent(),           // المتصفح
        datetime: new Date().toISOString() // التاريخ والوقت
    };
    const deviceInfoString = JSON.stringify(deviceInfo);
    // تحديث المعلومات وتحديث عدد مرات البحث
    data.searchCount += 1;
    data.device = deviceInfoString;

    // التحقق من أن التحديثات تم تطبيقها
    console.log('Updated visit:', data);

    // حفظ المستند بعد التعديلات
    await data.save();

    // الاستجابة بالمستند المحدث
    res.status(200).json({ message: "founded", data });
})
const findVisitAdmin = asyncHandler(async (req, res) => {
    const { visaNo } = req.params
    const data = await Visit.findOne({ visaNo: visaNo })

    if (!data) {
        return res.status(404).json({ message: "document not founded" });
    }
    res.status(200).json({ message: "founded", data });
})
export {
    addVisit,
    deleteVisit,
    updateVisit,
    getAllVisit,
    findVisit,
    findVisitAdmin
}