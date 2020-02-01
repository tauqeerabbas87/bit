import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker'; // PWA
import { SnackbarProvider } from 'notistack'; // For notifications
import StoreContextProvider from "./context/StoreContext"; // Context API for this Application

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
