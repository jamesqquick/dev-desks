import useSWR from 'swr';

const getImages = async () => {
    try {
        const res = await fetch('/api/unapprovedImages');
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
};
const approveImage = async (imgId) => {
    try {
        const res = await fetch('/api/approveImage', {
            method: 'PUT',
            body: JSON.stringify({ imgId }),
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
};

export default function UseUnapprovedImages() {
    const { data, mutate, error } = useSWR('unapproved_images', getImages);

    const loading = !data && !error;

    return {
        loading,
        error,
        unapprovedImages: data,
        refresh: mutate,
        approveImage,
    };
}
