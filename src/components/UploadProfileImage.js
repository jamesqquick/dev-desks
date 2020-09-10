import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAlert } from 'react-alert';

export default function Upload({ imageUploaded, closeModal }) {
    const [imageDataUrl, setImageDataUrl] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const alert = useAlert();

    return <div></div>;
}
