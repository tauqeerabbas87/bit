import React, {useState, useEffect} from 'react';
import { withSnackbar } from 'notistack';
import TopBar from '../common/TopBar';
import SearchResults from './SearchResults';
import {fetchArtistByName } from '../../api';
import useSearchArtistsPageStyles from './styles';
import Spinner from './../common/Spinner';
import {validateTextOnly} from './../../helpers/index';
import Button from '@material-ui/core/Button';

const SearchArtistsPage = (props) => {

    const classes = useSearchArtistsPageStyles();
    const [searchFieldTerm, setSearchFieldTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [spinner, setSpinner] = useState(false);

    const snackbarOptions = {
        variant: 'error',
        action: key =>(
            <Button onClick={() => { props.closeSnackbar(key) }}>
                Dismiss
            </Button>
        )
    };

    const getArtistDetails = async (searchFieldTerm) => {
        setSpinner(true);
        const result = await fetchArtistByName(searchFieldTerm);
        setSearchResult(result);
        setSpinner(false);
    };

    const onFormSubmit = (term) => {
        setSearchFieldTerm(term);
        const validSearch = validateTextOnly(term);
        if(validSearch){
            getArtistDetails(term);
        } else {
            props.enqueueSnackbar("Please enter alphabets only", snackbarOptions);
        }

    };

    useEffect(() => {
        if(!!searchResult && searchResult.responsePassed === false){
            props.enqueueSnackbar(searchResult.errorMessage, snackbarOptions);
        }
    }, [searchResult]);

    return (
        <>
            <TopBar onSubmit={onFormSubmit}/>
            {spinner ? <Spinner spin={spinner} /> : null }

            {!!searchResult && !!searchResult.apiResponse && searchResult.responsePassed === true ?
                <SearchResults result={searchResult.apiResponse}/>
                :
                null
            }

        </>
    );
};

export default withSnackbar(SearchArtistsPage);
