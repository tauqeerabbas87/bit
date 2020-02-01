import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import StoreContextProvider from "./context/StoreContext";

ReactDOM.render(
    <StoreContextProvider>
    <SnackbarProvider maxSnack={3}>
        <App />
    </SnackbarProvider>
    </StoreContextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
