import React, {useState, useEffect, useContext} from 'react';
import { withSnackbar } from 'notistack';
import {StoreContext} from "../../context/StoreContext";
import TopBar from '../common/TopBar';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";

const Page404 = (props) => {

    const {state, dispatch} = useContext(StoreContext);
    const {searchResult, eventsResult} = state;

    const setSearchPage = () =>{
        document.location.href = "/";
        dispatch({
            type:'PAGE',
            payload:'search'
        });
    };

    return (
        <>
            <TopBar />

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
                <Button onClick={setSearchPage} variant="contained" color="primary" size="large">
                    <BackIcon/>
                    Go to search artist page
                </Button>

            </Container>
        </>
    );
};

export default withSnackbar(Page404);
