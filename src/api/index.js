import {validateResponse, catchErrorResponse} from './../helpers/index';

export const APP_ID = "bandsintown";
export const BASE_URL = 'https://rest.bandsintown.com';


export const fetchArtistByName = async (query) => {
    let result = null;
    let parsedData = null;
    const key = 'search';
    let data = sessionStorage.getItem(key);
    if(!!data){
        parsedData = JSON.parse(data);
    }
    if(!!parsedData && parsedData.query === query){
        return parsedData.result;
    } else {
        result = await fetch(`${BASE_URL}/artists/${query}?app_id=${APP_ID}`)
            .then(response => {
                return validateResponse(response);
            })
            .catch(err => {
                return catchErrorResponse(err);
            });
        sessionStorage.setItem(key, JSON.stringify({result, query}));
        return result;
    }


};

export const fetchArtistEvents = async (query, date='upcoming') => {
    let result = null;
    let parsedData = null;
    const key = 'events';
    let data = sessionStorage.getItem(key);
    if(!!data){
        parsedData = JSON.parse(data);
    }
    if(!!parsedData && parsedData.query === query){
        return parsedData.result;
    } else{
        result = await fetch(`${BASE_URL}/artists/${query}/events?app_id=${APP_ID}&date=${date}`)
            .then(response => {
                return validateResponse(response);
            })
            .catch(err => {
                return catchErrorResponse(err);
            });
        sessionStorage.setItem(key, JSON.stringify({result, query}));
    }

    return result;
};
