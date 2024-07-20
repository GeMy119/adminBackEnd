import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
    {
        visaNo: { type: String, required: true }, // رقم التأشيره
        passportNo: { type: String, required: true }, // رقم جواز السفر
        code: { type: String, required: true }, //رقم السجل   
        applicationNo: { type: String, required: true }, // رقم الطلب
        name: { type: String, required: true },
        birthDate: { type: Date, required: true }, // تاريخ الميلاد
        validFrom: { type: Date, required: true }, // صالحه اعتبارا من 
        validUntil: { type: Date, required: true }, // صالحه لغايه
        image: { type: String, required: true },
        typeOfVisa: { type: String, required: true }, // نوع التأشيره
        durationOfStay: { type: String, required: true }, // مده الاقامه
        nationality: { type: String, required: true }, // الجنسيه  
        placeOfIssue: { type: String, required: true }, // مصدر التأشيره
        entryType: { type: String, required: true }, // عدد مرات الدخول
        purpose: { type: String, required: true }, //  الغرض
        barcodeImage: { type: String, required: true },

    },
    {
        timestamps: true
    }
)
const Visit = mongoose.model("visit", visitSchema)
export default Visit 