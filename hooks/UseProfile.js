import useSWR from 'swr';

const getProfile = async () => {
    const res = await fetch('/api/profile');
    const data = await res.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
};

const updateProfile = async (fields) => {
    await fetch('/api/updateProfile', {
        method: 'PUT',
        body: JSON.stringify(fields),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

export default function useProfile() {
    const { data, mutate, error } = useSWR('api_profile', getProfile);
    const loading = !data && !error;
    return {
        profile: data || {},
        refreshProfile: mutate,
        updateProfile,
        loading,
    };
}
