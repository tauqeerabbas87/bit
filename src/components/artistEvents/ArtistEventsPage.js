import React, {useState, useEffect, useContext} from 'react';
import { withSnackbar } from 'notistack';
import {StoreContext} from "../../context/StoreContext";
import TopBar from '../common/TopBar';
import useArtistEventsPageStyles from './styles';
import {fetchArtistEvents} from '../../api';
import Spinner from './../common/Spinner';
import EventsListItem from './EventsListItem';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import {
    Container,
    Typography,
    Grid,
    List,
    ListItemText,
    ListItemAvatar,
    ListItem,
    Avatar,
    Button
} from "@material-ui/core";

const ArtistEventsPage = (props) => {

    // STYLE object created
    const classes = useArtistEventsPageStyles();

    // Destructuring APPLICATION STATE AND DIPATCH method
    const {state, dispatch} = useContext(StoreContext);

    // Destructuring current page, search Result and events Result from
    //APPLICATION STATE
    const {page, searchResult, eventsResult} = state;

    // Check and get if Artist's Data exists in APPLICATION STORE
    const artistData = !!searchResult && !!searchResult.apiResponse ? searchResult.apiResponse : null;

    // Component state for show/hide spinner while API call
    const [spinner, setSpinner] = useState(false);

    // Action to dispatch a "Redirect to Search Artist's page"
    const setSearchPage = () =>{
        dispatch({
            type:'PAGE',
            payload:'search'
        });
    };

    useEffect(() => {

        // Async function to fetch artist events data
        const getEventsDetails = async () => {
            setSpinner(true);
            await fetchArtistEvents(state, dispatch);
            setSpinner(false);
        };

        // Check if current PAGE is "events detail" or "Search artist"
        if(page === "events"){
            getEventsDetails();
        }
    }, [page, eventsResult, state, dispatch]);

    return (
        <>
            {/*header TopBar component*/}
            <TopBar />

            {/*Spinner component for async work*/}
            {spinner ? <Spinner spin={spinner} /> : null }

            {/*component layout container*/}
            <Container fixed>

                {/*Button to go back to "Search Artist" page */}
                <Button onClick={setSearchPage}>
                    <BackIcon/>
                    Back to results
                </Button>

                {/*Check if artist data exists in store then display Artist Data and events details */}
                {!!artistData ?
                    <>
                        <List className={classes.artistList}>
                            <ListItem
                            alignItems="flex-start"
                            className={classes.artistListItem}>
                            <ListItemAvatar classes={{root:classes.avatarRoot}}>
                                <Avatar
                                    alt={artistData.name}
                                    src={artistData.thumb_url}
                                    className={classes.artistAvatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography
                                        component="div"
                                        variant="h4"
                                        color="textPrimary"
                                        className={classes.textAlignment}
                                    >
                                        {artistData.name}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        component="a"
                                        variant="subtitle2"
                                        color="textSecondary"
                                        onClick={e=>e.stopPropagation()}
                                        target="_blank"
                                        href={artistData.facebook_page_url}
                                        className={classes.textAlignment}
                                    >
                                        {artistData.facebook_page_url}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        </List>

                        <Typography
                            component="div"
                            variant="body1"
                            color="textPrimary"
                            gutterBottom={true}
                        >
                            {`${artistData.upcoming_event_count} upcoming events`}
                        </Typography>

                    {/*Check if eventsResult is not empty*/}
                    {!!eventsResult && !!eventsResult.apiResponse && eventsResult.apiResponse.length > 0 && !!eventsResult.responsePassed && eventsResult.responsePassed === true ?
                        <Grid container spacing={3}>
                            { eventsResult.apiResponse.map(item=>(
                                <EventsListItem key={item.id} event={item}/>
                            ))}
                        </Grid>
                        :
                        null
                    }
                    </> : null}
            </Container>
        </>
    );
};

export default withSnackbar(ArtistEventsPage);
