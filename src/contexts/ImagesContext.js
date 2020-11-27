import React, { createContext } from 'react';
import { useQuery, queryCache } from 'react-query';
import { getApprovedImages } from '../utils/queries.js';
const ImagesContext = createContext();

const ImagesProvider = ({ children }) => {
    const { data: images, isLoading, error } = useQuery(
        `fetchApprovedImages`,
        getApprovedImages,
        {
            refetchOnWindowFocus: true,
            retry: false,
        }
    );

    const refetchImages = async () => {
        queryCache.invalidateQueries(`fetchApprovedImages`);
    };

    return (
        <ImagesContext.Provider
            value={{
                images,
                refetchImages,
                error,
                isLoading,
            }}
        >
            {children}
        </ImagesContext.Provider>
    );
};

export { ImagesProvider, ImagesContext };
