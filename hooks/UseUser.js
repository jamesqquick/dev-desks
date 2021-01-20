import useSWR from 'swr';

const getUser = async () => {
    const res = await fetch('/api/me');
    const data = await res.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
};

export default function useUser() {
    const { data, mutate, error } = useSWR('api_user', getUser);
    const loading = !data && !error;
    const loggedIn = !error && data !== undefined;

    return {
        loading,
        loggedIn,
        user: data,
        mutate,
    };
}
