import React from 'react';

export default function ImagePreview({
    imageDataUrl,
    closeModal,
    imageUploaded,
}) {
    const uploadImage = async (e) => {
        e.target.value = null;

        e.preventDefault();
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: imageDataUrl,
            });

            imageUploaded();
            closeModal();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className=" ">
            <img
                className="rounded-md shadow-lg mb-5 max-h-3/4 "
                src={imageDataUrl}
                alt="Desk Setup"
            />
            <div>
                <button
                    type="submit"
                    className="inline-block text-sm px-4 py-2 rounded bg-accent-green-400 text-white hover:bg-accent-green-500 mr-2"
                    disabled={!imageDataUrl}
                    onClick={uploadImage}
                >
                    Upload
                </button>
                <button
                    type="button"
                    className="inline-block text-sm px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 "
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
