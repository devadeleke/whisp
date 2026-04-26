 import { v2 as cloudinary } from 'cloudinary';
 import { ENV } from './env.js';
 
const requiredCloudinaryEnv = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
];

for (const key of requiredCloudinaryEnv) {
    if (!ENV[key]) {
        throw new Error(`${key} is not configured`);
    }
}

 cloudinary.config({
     cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
     api_key: ENV.CLOUDINARY_API_KEY,
     api_secret: ENV.CLOUDINARY_API_SECRET,
 });

    export default cloudinary;