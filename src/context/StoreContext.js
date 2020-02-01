import React, {createContext, useEffect, useReducer} from 'react';
import initialState from "./initialState";
import reducer from './reducer';

const sessionStore = JSON.parse(sessionStorage.getItem('state'));

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, sessionStore || initialState);

    useEffect(()=>{
        sessionStorage.setItem('state', JSON.stringify(state));
    },[state]);

    return (
        <>
            <StoreContext.Provider value={{state, dispatch}}>
                {props.children}
            </StoreContext.Provider>
        </>
    );
};

export default StoreContextProvider;


