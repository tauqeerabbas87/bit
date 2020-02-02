// Importing Helper functions that can be used throughout application
import {validateResponse, catchErrorResponse} from './../helpers/index';

//Application APP_ID for API and URL
export const APP_ID = "bandsintown";
export const BASE_URL = 'https://rest.bandsintown.com';


/*
* API CALL
* FETCH ARTIST BY NAME
* AND
* DISPATCH THE RESPONSE INTO THE REDUCER
* WHICH WILL UPDATE THE STORE OBJECT IN SESSION STORAGE
*/
export const fetchArtistByName = async (state, dispatch) => {
    let {query, searchResult} = state;
    let result = null;
    if(!(!!searchResult && searchResult.query === query)) {
        result = await fetch(`${BASE_URL}/artists/${query}?app_id=${APP_ID}`)
            .then(response => {
                return validateResponse(response,query);
            })
            .catch(err => {
                return catchErrorResponse(err);
            });

        dispatch({
            type:'SET_SEARCH_RESULT',
            payload:{
                result,
                query
            }
        });
    } else if(searchResult.apiResponse === ""){
        result = {
            apiResponse: searchResult.apiResponse,
            responsePassed:false,
            errorMessage:`Result not found!`,
            query
        }
    }
    return result;
};



/*
* API CALL
* FETCH ARTIST'S UPCOMING EVENTS
* AND
* DISPATCH THE RESPONSE INTO THE REDUCER
* WHICH WILL UPDATE THE STORE OBJECT IN SESSION STORAGE
*/
export const fetchArtistEvents = async (state, dispatch, date='upcoming') => {
    let {query, eventsResult} = state;
    let result = null;
    if(!(!!eventsResult && eventsResult.query === query)) {
        result = await fetch(`${BASE_URL}/artists/${query}/events?app_id=${APP_ID}&date=${date}`)
            .then(response => {
                return validateResponse(response,query);
            })
            .catch(err => {
                return catchErrorResponse(err);
            });
        dispatch({
            type:'SET_EVENTS_RESULT',
            payload:{
                result,
                query
            }
        });
    } else if(eventsResult.apiResponse === ""){
        result = {
            apiResponse: eventsResult.apiResponse,
            responsePassed:false,
            errorMessage:`Result not found!`,
            query
        }
    }

    return result;
};
