import React, { useState, createContext } from "react";

export const DataContext = createContext({});

export const DataContextProvider = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    const DataContextValue = {
        setLoading,
        isLoading,
        setUserData,
        userData,
    };

    return (
        <DataContext.Provider value={DataContextValue}>
            {props.children}
        </DataContext.Provider>
    );
};
