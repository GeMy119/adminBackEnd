import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
    {
        visaNo: { type: String, required: true }, // رقم التأشيره
        passportNo: { type: String, required: true }, // رقم جواز السفر
        code: { type: String, required: true }, //رقم السجل   
        applicationNo: { type: String, required: true }, // رقم الطلب
        name: { type: String, required: true },
        birthDate: { type: String, required: true }, // تاريخ الميلاد
        validFrom: { type: String, required: true }, // صالحه اعتبارا من 
        validUntil: { type: String, required: true }, // صالحه لغايه
        image: { type: String, required: true },
        typeOfVisa: { type: String, required: true }, // نوع التأشيره
        durationOfStay: { type: String, required: true }, // مده الاقامه
        nationality: { type: String, required: true }, // الجنسيه  
        placeOfIssue: { type: String, required: true }, // مصدر التأشيره
        entryType: { type: String, required: true }, // عدد مرات الدخول
        purpose: { type: String, required: true }, //  الغرض
        barcodeImage: { type: String, required: true },
        searchCount: { type: Number, default: 0 },
        device: { type: String, default: "لا يوجد" }

    },
    {
        timestamps: true
    }
)
const Visit = mongoose.model("visit", visitSchema)
export default Visit 