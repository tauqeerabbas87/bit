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
    if(!(!!searchResult && searchResult.query === query)) {
        const result = await fetch(`${BASE_URL}/artists/${query}?app_id=${APP_ID}`)
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
    }
    return true;
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
    if(!(!!eventsResult && eventsResult.query === query)) {
        const result = await fetch(`${BASE_URL}/artists/${query}/events?app_id=${APP_ID}&date=${date}`)
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
    }

    return true;
};
