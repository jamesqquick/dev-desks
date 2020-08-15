import React from 'react';
import { Transformation, Image } from 'cloudinary-react';

export default function ProfileWrapper({ user, imageClicked, children }) {
    return (
        <div className="d-flex justify-content-center">
            <div className="card profile">
                <div className="editable-profile-image">
                    <Image
                        cloudName="jamesqquick"
                        publicId={
                            user.imgId || 'dev_setups/placeholder-image_vcbif2'
                        }
                        className="card-img-top"
                        onClick={imageClicked}
                    >
                        <Transformation width="800" crop="fill" />
                    </Image>
                </div>
                <div className="card-body">{children}</div>
            </div>
        </div>
    );
}
