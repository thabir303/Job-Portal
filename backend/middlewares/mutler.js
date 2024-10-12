import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory to access the buffer
export const singleUpload = multer({ storage }).single("file"); // 'file' should match frontend form-data
