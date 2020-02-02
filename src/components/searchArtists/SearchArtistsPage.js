import React, {useState, useEffect, useContext} from 'react';
import { withSnackbar } from 'notistack';
import TopBar from '../common/TopBar';
import SearchResults from './SearchResults';
import {fetchArtistByName } from '../../api';
import Spinner from './../common/Spinner';
import {validateTextOnly} from './../../helpers/index';
import Button from '@material-ui/core/Button';
import {StoreContext} from "../../context/StoreContext";

const SearchArtistsPage = (props) => {

    // Destructuring APPLICATION STATE AND DIPATCH method
    const {state, dispatch} = useContext(StoreContext);

    // Destructuring search query and last search result from
    //APPLICATION STATE
    const {query, searchResult} = state;

    // Component state for show/hide spinner while API call
    const [spinner, setSpinner] = useState(false);

    // Common Object for notifications
    const snackbarOptions = {
        variant: 'error',
        action: key =>(
            <Button onClick={() => { props.closeSnackbar(key) }}>
                Dismiss
            </Button>
        )
    };

    // Async function to fetch artist details
    const getArtistDetails = async () => {
        setSpinner(true);
        const result = await fetchArtistByName(state, dispatch);
        setSpinner(false);
        if(!!result && result.responsePassed === false){
            props.enqueueSnackbar(result.errorMessage, snackbarOptions);
        }
    };

    // OnForm Submit from TopBar component
    // this function validate input value and
    //request for artist details
    const onFormSubmit = () => {
        const validSearch = validateTextOnly(query);
        if(validSearch){
            getArtistDetails();
        } else {
            props.enqueueSnackbar("Please enter alphabets only", snackbarOptions);
        }

    };

    useEffect(() => {
        //Check if their is an error in API response
        if(!!searchResult && !!searchResult.responsePassed && searchResult.responsePassed === false){
            props.enqueueSnackbar(searchResult.errorMessage, snackbarOptions);
        }
    }, [searchResult, snackbarOptions,props]);

    return (
        <>
            {/*header TopBar component*/}
            <TopBar onSubmit={onFormSubmit}/>

            {/*Spinner component for async work*/}
            {spinner ? <Spinner spin={spinner} /> : null }

            {/*Check if searchResult is not empty*/}
            {!!!!searchResult && !!searchResult.apiResponse && !!searchResult.responsePassed && searchResult.responsePassed === true ?
                <SearchResults result={searchResult.apiResponse}/>
                :
                null
            }

        </>
    );
};

export default withSnackbar(SearchArtistsPage);
