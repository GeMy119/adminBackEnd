import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        IdNumber: { type: String, required: true }, // الزوج
        outgoingNumber: { type: String, required: true }, // الزوج رقم الصادر
        transactionNumber: { type: String, required: true }, //الرقم المعامله الزوج 
        userOccupation: { type: String, required: true }, //المهنه الزوج 
        userSerialNumber: { type: String, required: true }, // الزوج
        name: { type: String, required: true }, // الزوج 
        releaseDate: { type: String, required: true }, // الزوج تاريخ الاصدار
        image: { type: String },
        dateBoking: { type: String, required: true },
        // الاستعلام عن تصريح الزواج
        WifeSerialNumber: { type: String, required: true }, // الزوجه
        wifeName: { type: String, required: true },
        type: { type: String, required: true }, // النوع الزوجه
        condition: { type: String, required: true }, // الزوجه الحاله
        nationality: { type: String, required: true }, // الزوجه جنسيه  
        occupationCategory: { type: String, required: true }, // فئه المنه الزوجه
        searchCountMerage: { type: Number, default: 0 },
        searchCountTransaction: { type: Number, default: 0 },
        deviceMerageSearch: { type: String, default: "لا يوجد" },
        deviceTransactionSearch: { type: String, default: "لا يوجد" }
    },
    {
        timestamps: true
    }
)
const User = mongoose.model("user", userSchema)
export default User 