import imageCompression from 'browser-image-compression';
import { toast } from 'sonner';

export const compressImage = async (file: File): Promise<string> => {
    try {
        const options = {
            maxSizeMB: 0.5, // Max size 500KB
            maxWidthOrHeight: 1920, // Max dimension
            useWebWorker: true,
            fileType: 'image/jpeg', // Convert ke JPEG untuk size lebih kecil
            initialQuality: 0.8, // 80% quality (sweet spot)
        };

        if (file.size > 2 * 1024 * 1024) {
            toast.error('File terlalu besar (maksimum 2MB)');
            return '';
        }

        const compressedFile = await imageCompression(file, options);

        // console.log(
        //     `Before: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        // );
        // console.log(
        //     `After: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`
        // );

        // Convert to base64
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    } catch (error) {
        console.error('Image compression failed:', error);
        // Fallback: use original
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    }
};