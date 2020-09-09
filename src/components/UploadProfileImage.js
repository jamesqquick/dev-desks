import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAlert } from 'react-alert';

export default function Upload({ imageUploaded, closeModal }) {
    const [imageDataUrl, setImageDataUrl] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const alert = useAlert();

    const handleChange = (e) => {
        const file = e.target.files[0];
        const fsize = Math.round(file.size / 1024); //file size in kb
        if (fsize >= 4096) {
            alert.show('File size too big. Please upload a file under 4mb.', {
                type: 'danger',
            });
            e.target.value = null;
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageDataUrl(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="file">Upload your setup</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control-file"
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mb-2"
                    disabled={!imageDataUrl}
                >
                    Upload
                </button>
                <button
                    type="button"
                    className="btn btn-danger mb-2"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </form>
            {imageDataUrl && (
                <img
                    className="img img-fluid"
                    src={imageDataUrl}
                    alt="Desk Setup"
                />
            )}
        </div>
    );
}
