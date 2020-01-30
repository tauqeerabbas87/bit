import React, {createContext, useState, useEffect} from 'react';

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

    const [page, setPage] = useState('search');
    const [term, setTerm] = useState('');

    useEffect(()=>{

    },[page, term]);

    return (
        <>
            <StoreContext.Provider value={{page, setPage, term, setTerm}}>
                {props.children}
            </StoreContext.Provider>
        </>
    );
};

export default StoreContextProvider;


