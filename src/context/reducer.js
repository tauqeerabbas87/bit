/*
* REDUCER used for
* APPLICATION STORE
*/
export default (state, action) => {
    switch (action.type) {
        case 'PAGE':
            return {
                ...state,
                page:action.payload
            };
        case 'QUERY':
            return {
                ...state,
                query:action.payload
            };
        case 'SET_SEARCH_RESULT':
            return {
                ...state,
                query:action.payload.query,
                searchResult:action.payload.result
            };
        case 'SET_EVENTS_RESULT':
            return {
                ...state,
                query:action.payload.query,
                eventsResult:action.payload.result
            };
        default:
            return state;
    }
};