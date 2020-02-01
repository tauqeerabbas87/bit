/*
* Function to validate
* Search Text Field contains only Text
*/
export const validateTextOnly = (field) => {
    const pattern = /^[A-Za-z\s]+$/;
    return !!field.match(pattern);
};



/*
* Extract Date for display
* Extract DATE from date time api response
*/
export const formatDate = (dateTime) => {
    const dateTime_arr = dateTime.indexOf('T') !== -1 ?dateTime.split('T') : null;
    if(!!dateTime_arr && dateTime_arr.length){
        const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const theDate = dateTime_arr[0].split('-');
        return `${theDate[2]} ${month[parseInt(theDate[1], 10)-1]}, ${theDate[0]}`;
    }
    return dateTime_arr;
};



/*
* Generic function for
* API RESPONSE VALIDATION and returns the object
* after parsing into JSON
*/
export const validateResponse = async (response, query) => {
    if (response.status !== 200) {
        return {
            responsePassed:false,
            errorMessage:`Looks like there was a problem. Status Code: ${response.status}`,
            response
        }
    } else{
        let parsedResult = await response.json();
        if((!!parsedResult.error && parsedResult.error === "Not Found") || parsedResult === ""){
            parsedResult = {
                apiResponse: parsedResult,
                responsePassed:false,
                errorMessage:`Result not found!`
            }
        } else {
            parsedResult = {
                apiResponse:parsedResult,
                responsePassed:true,
                query
            }
        }
        return parsedResult;

    }
};



/*
* Generic function for
* API RESPONSE CATCH section error message
*/
export const catchErrorResponse = (err) => {
    return {
        responsePassed:false,
        errorMessage:err,
    }
};