import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAlert } from 'react-alert';
import { Transformation, Image } from 'cloudinary-react';

export default function UserImageUpload({ existingImageId }) {
    const alert = useAlert();

    const onDrop = useCallback(
        (acceptedFiles) => {
            console.log(acceptedFiles);
            const file = acceptedFiles[0];
            const fsize = Math.round(file.size / 1024); //file size in kb
            if (fsize >= 4096) {
                alert.show(
                    'File size too big. Please upload a file under 4mb.',
                    {
                        type: 'danger',
                    }
                );
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                console.log(reader.result);
            };
            reader.onerror = () => {
                console.error('AHHHHHHHH!!');
            };
        },
        [alert]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <>
            <Image
                cloudName="jamesqquick"
                publicId={
                    existingImageId || 'dev_setups/placeholder-image_vcbif2'
                }
                className="rounded-md shadow-lg mx-auto"
            >
                <Transformation width="800" crop="fill" />
            </Image>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
        </>
    );
}
