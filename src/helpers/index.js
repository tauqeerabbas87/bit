
export const validateTextOnly = (field) => {
    const pattern = /^[A-Za-z\s]+$/;
    return !!field.match(pattern);
};

export const formatDate = (dateTime) => {
    const dateTime_arr = dateTime.indexOf('T') !== -1 ?dateTime.split('T') : null;
    if(dateTime_arr.length){
        const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const theDate = dateTime_arr[0].split('-');
        return `${theDate[2]} ${month[parseInt(theDate[1], 10)]}, ${theDate[0]}`;
    }
    return dateTime_arr;
};

export const validateResponse = async (response) => {
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
                errorMessage:`Result not found!`,
            }
        } else {
            parsedResult = {
                apiResponse:parsedResult,
                responsePassed:true,
            }
        }
        return parsedResult;

    }
};

export const catchErrorResponse = (err) => {
    return {
        responsePassed:false,
        errorMessage:err,
    }
};