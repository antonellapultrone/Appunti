import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config({ path: './credenciales.env' });

// Configura tus credenciales de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // Configuración de Multer para manejar la carga de archivos
    const storage = multer.memoryStorage();
    const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Límite de 5MB
    }
    });

    // Función de subida a Cloudinary
    export const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
        {
            folder: 'appunti_services', // Carpeta donde se guardarán las imágenes
            resource_type: 'auto'
        }, 
        (error, result) => {
            if (error) {
            reject(error);
            } else {
            resolve(result);
            }
        }
        );

        // Convertir el buffer del archivo a stream
        uploadStream.end(file.buffer);
    });
    };

export { upload, cloudinary };