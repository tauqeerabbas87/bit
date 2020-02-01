import {validateResponse, catchErrorResponse} from './../helpers/index';

export const APP_ID = "bandsintown";
export const BASE_URL = 'https://rest.bandsintown.com';


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
