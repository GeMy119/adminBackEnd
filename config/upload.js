import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// إعداد Multer للتعامل مع رفع الصور
console.log("aaaaaaaaaaaaaaaaaaa")
const storage = multer.memoryStorage(); // تخزين الملفات في الذاكرة كـ buffers
const uploadImage = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = /\.(png|jpg|jpeg)$/;
        if (!allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
            console.log("ay  hagaaaaaaaaaa")
            return cb(new Error("Please upload an image with a valid format (png, jpg, or jpeg)."));
        }
        cb(null, true);
    },
}).single('image'); // تأكد من أن اسم الحقل هو 'image'

// إعداد Cloudinary بمفاتيحك
cloudinary.config({
    cloud_name: 'dlulkmk24',
    api_key: 669979551947332,
    api_secret: process.env.API_SECRET_CLOUD,
});

/**
 * رفع صورة Buffer إلى Cloudinary.
 * @param {Buffer} imageBuffer - Buffer الصورة.
 * @param {string} [key] - معرف عام اختياري للصورة.
 * @returns {Promise<string>} - رابط الصورة المرفوعة.
 */
const uploadImageToCloudinary = async (imageBuffer, key) => {
    try {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: "your_folder_name", // عدل حسب الحاجة
                public_id: key || undefined, // اختياري: تحديد public_id إذا كان متاحاً
                resource_type: "image", // تأكد من تحديد نوع المورد كـ image
            }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(imageBuffer);
        });

        console.log('Image uploaded to Cloudinary:', result.secure_url);
        return result.secure_url; // تأكد من إرجاع رابط secure_url
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error.message);
        throw new Error('Error uploading user image');
    }
};

export { uploadImage, uploadImageToCloudinary };
