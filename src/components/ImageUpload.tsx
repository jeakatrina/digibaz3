"use client"
import { UploadButton } from '@/utils/uploadthing';
import { FC, useState } from 'react';

interface ImageUploadProps {
    onUploadSuccess: (imageUrl: string) => void;
    onUploadError: (error: Error) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ onUploadSuccess, onUploadError }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleUploadComplete = (res: any) => {
        // Assuming 'res' contains the image URL
        const uploadedUrl = res?.url; // Adjust according to the actual response structure
        setImageUrl(uploadedUrl);
        onUploadSuccess(uploadedUrl);
    };

    return (
        <div>
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={onUploadError}
            />
            {imageUrl && <img src={imageUrl} alt="Uploaded" />} {/* Show the uploaded image */}
        </div>
    );
};

export default ImageUpload;
