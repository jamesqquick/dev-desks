import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { userHasRole } from './api/auth/[...auth0]';
import { Image, Transformation, Placeholder } from 'cloudinary-react';
import Button from '../components/Button';
import useUnapprovedImages from '../hooks/UseUnapprovedImages';

export default function Admin() {
    const { unapprovedImages, approveImage, refresh } = useUnapprovedImages();
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const handleApproveImage = async (imgId) => {
        console.log('handle approval');
        try {
            await approveImage(imgId);
            refresh();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Unapproved Images</h1>
            {unapprovedImages &&
                unapprovedImages.map((image) => (
                    <div key={image.imgId}>
                        <Image
                            cloudName={cloudName}
                            publicId={image.imgId}
                            className="rounded-md shadow-md hover:shadow-xl transform transition-transform hover:-translate-y-1 duration-200 mb-2"
                            loading="lazy"
                        >
                            <Transformation height="200" />
                            <Placeholder type="blur" />
                        </Image>
                        <Button
                            text="Approve"
                            callback={() => handleApproveImage(image.id)}
                        ></Button>
                    </div>
                ))}
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps({ req, res }) {
        const { user } = await getSession(req, res);
        if (!userHasRole(user, 'admin')) {
            res.writeHead(302, { Location: '/' });
            res.end();
        }
        return {
            props: {},
        };
    },
});
