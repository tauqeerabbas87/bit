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

    const {state, dispatch} = useContext(StoreContext);
    const {query, searchResult} = state;
    const [spinner, setSpinner] = useState(false);

    const snackbarOptions = {
        variant: 'error',
        action: key =>(
            <Button onClick={() => { props.closeSnackbar(key) }}>
                Dismiss
            </Button>
        )
    };

    const getArtistDetails = async () => {
        setSpinner(true);
        await fetchArtistByName(state, dispatch);
        setSpinner(false);
    };

    const onFormSubmit = () => {
        const validSearch = validateTextOnly(query);
        if(validSearch){
            getArtistDetails();
        } else {
            props.enqueueSnackbar("Please enter alphabets only", snackbarOptions);
        }

    };

    useEffect(() => {
        if(!!searchResult && !!searchResult.responsePassed && searchResult.responsePassed === false){
            props.enqueueSnackbar(searchResult.errorMessage, snackbarOptions);
        }
    }, [searchResult, snackbarOptions,props]);

    return (
        <>
            <TopBar onSubmit={onFormSubmit}/>
            {spinner ? <Spinner spin={spinner} /> : null }

            {!!!!searchResult && !!searchResult.apiResponse && !!searchResult.responsePassed && searchResult.responsePassed === true ?
                <SearchResults result={searchResult.apiResponse}/>
                :
                null
            }

        </>
    );
};

export default withSnackbar(SearchArtistsPage);
