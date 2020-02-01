import React, {useContext} from 'react';
import {Button, Container, Typography} from "@material-ui/core";
import {StoreContext} from "../../context/StoreContext";
import TopBar from '../common/TopBar';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';

const Page404 = (props) => {

    //Destructing dispatch action from STORE CONTEXT
    const {dispatch} = useContext(StoreContext);

    // Redirect to "search artist" PAGE
    const setSearchPage = () =>{
        document.location.href = "/";
        dispatch({
            type:'PAGE',
            payload:'search'
        });
    };

    return (
        <>
            {/*header TopBar component*/}
            <TopBar />

            {/*component layout container*/}
            <Container fixed>
                <Typography
                    component="h1"
                    variant="h3"
                    color="textPrimary"
                    gutterBottom={true}
                >
                    404 Page Not Found
                </Typography>
                <Typography
                    component="h1"
                    variant="h5"
                    color="textPrimary"
                    gutterBottom={true}
                >
                    The page your are looking for does not exists!
                </Typography>

                {/*Button to redirect to "Search Artist PAGE "*/}
                <Button onClick={setSearchPage} variant="contained" color="primary" size="large">
                    <BackIcon/>
                    Go to search artist page
                </Button>

            </Container>
        </>
    );
};

export default Page404;
