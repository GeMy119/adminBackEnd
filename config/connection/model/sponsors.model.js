import mongoose from "mongoose";
// Define a schema for the worker
const workerSchema = new mongoose.Schema({
    // Define the properties of each worker object
    workerName: { type: String, required: true },
    residencyNumber: { type: String, required: true },
    typeOfConsent: { type: String, required: true },
    nationality: { type: String, required: true },
    occupation: { type: String, required: true },
    type: { type: String, required: true },
    // Add other properties of a worker as needed
});
const sponsorSchema = new mongoose.Schema(
    {
        sponsorId: { type: String, required: true, unique: true }, // رقم هويه الكفيل
        sourceNumber: { type: String, required: true, unique: true }, // الزوج رقم المصدر
        name: { type: String, required: true }, // اسم المؤسسه او الكفيل 
        dateOfLastModification: { type: Date, required: true }, // تاريخ اخر تعديل
        // بيانات العمال
        workers: [workerSchema],
    },
    {
        timestamps: true
    }
)
const Sponsor = mongoose.model("sponsor", sponsorSchema)
export default Sponsor 