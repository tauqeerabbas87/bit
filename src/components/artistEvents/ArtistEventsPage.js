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
    const {setPage, term, page} = useContext(StoreContext);
    const [eventResult, setEventResult] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [artistData, setArtistData] = useState(null);

    const getEventsDetails = async (searchFieldTerm) => {
        setSpinner(true);
        const result = await fetchArtistEvents(searchFieldTerm);
        setEventResult(result);
        setSpinner(false);
    };

    const getArtistDetails = async () => {
       const data = sessionStorage.getItem('search');
       if(!!data){
           const result = await JSON.parse(data);
           setArtistData(result.result.apiResponse);
       }
    };

    useEffect(() => {
        if(page === "events"){
            getEventsDetails(term);
            getArtistDetails();
        }
    }, [term, page]);

    return (
        <>
            <TopBar />
            {spinner ? <Spinner spin={spinner} /> : null }
            <Container fixed>
            <Button onClick={()=>{
                setPage('search');
            }}>
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

                {!!eventResult && !!eventResult.apiResponse && eventResult.apiResponse.length > 0 && eventResult.responsePassed === true ?
                    <Grid container spacing={3}>
                        { eventResult.apiResponse.map(item=>(
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
