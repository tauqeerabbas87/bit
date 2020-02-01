import React, {useState, useEffect, useContext} from 'react';
import { withSnackbar } from 'notistack';
import {StoreContext} from "../../context/StoreContext";
import TopBar from '../common/TopBar';
import useArtistEventsPageStyles from './styles';
import {fetchArtistEvents} from '../../api';
import Spinner from './../common/Spinner';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import {Container} from "@material-ui/core";
import EventsListItem from './EventsListItem';
import Grid from "@material-ui/core/Grid";

const ArtistEventsPage = (props) => {

    const classes = useArtistEventsPageStyles();

    const {state, dispatch} = useContext(StoreContext);
    const {page, searchResult, eventsResult} = state;
    const artistData = !!searchResult && !!searchResult.apiResponse ? searchResult.apiResponse : null;

    const [spinner, setSpinner] = useState(false);

    const setSearchPage = () =>{
        dispatch({
            type:'PAGE',
            payload:'search'
        });
    };

    useEffect(() => {

        const getEventsDetails = async () => {
            setSpinner(true);
            await fetchArtistEvents(state, dispatch);
            setSpinner(false);
        };

        if(page === "events"){
            getEventsDetails();
        }
    }, [page, eventsResult, state, dispatch]);

    return (
        <>
            <TopBar />

            {spinner ? <Spinner spin={spinner} /> : null }

            <Container fixed>
                <Button onClick={setSearchPage}>
                    <BackIcon/>
                    Back to results
                </Button>

            {!!artistData ? <>
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
