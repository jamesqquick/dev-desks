import useSWR from 'swr';

const getImages = async () => {
    try {
        const res = await fetch('/api/approvedImages');
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

export default function useImages() {
    const { data, mutate, error } = useSWR('approved_images', getImages);

    const loading = !data && !error;

    return {
        loading,
        error,
        images: data,
        mutate,
    };
}
