import React, { useState } from 'react';
import { useAuth0 } from '../utils/auth';

export default function Upload() {
    const [imageDataUrl, setImageDataUrl] = useState('');
    const [inputFile, setInputFile] = useState('');
    const { user, getTokenSilently } = useAuth0();
    const handleChange = (e) => {
        const file = e.target.files[0];
        setInputFile(file.name);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageDataUrl(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submitting');
        try {
            const token = await getTokenSilently();
            const res = await fetch('/.netlify/functions/upload', {
                method: 'POST',
                body: imageDataUrl,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setImageDataUrl('');
            setInputFile('');
        } catch (err) {
            console.error(err);
        }
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
                        // value={inputFile}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mb-2"
                    disabled={!imageDataUrl}
                >
                    Upload
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
