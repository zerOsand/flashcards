import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

/**
 * `SearchProvider` is a context provider that manages the global `searchTerm` state.
 * It allows child components to access and update the `searchTerm`.
 * 
 * @param {ReactNode} children - The components that will have access to the context value.
 * 
 * @returns {JSX.Element} A `SearchContext.Provider` that provides the `searchTerm` and `setSearchTerm`.
 */
export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};

/**
 * Custom hook that provides access to the `searchTerm` and `setSearchTerm` 
 * from the `SearchContext`.
 * 
 * @returns {Object} An object containing `searchTerm` and `setSearchTerm`.
 */
export const useSearch = () => {
    return useContext(SearchContext);
};

