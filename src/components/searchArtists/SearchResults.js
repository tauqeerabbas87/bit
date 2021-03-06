import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {useArtistListStyles} from './styles';
import {Container} from "@material-ui/core";
import {StoreContext} from "./../../context/StoreContext";

const SearchResults =  ({result}) => {

    // STYLE object created
    const classes = useArtistListStyles();

    // Destructuring Artist details from result props
    const {name, thumb_url, facebook_page_url} = result;

    // Destructuring DISPATCH from STORE CONTEXT
    const {dispatch} = useContext(StoreContext);

    // Redirect to Events List PAGE
    const setEventsPage = () =>{
        dispatch({
            type:'PAGE',
            payload:'events'
        });
    };

    return (
        <Container fixed>
            <Typography variant="h5" noWrap>
                {`Result found for "${result.name}"`}
            </Typography>
            <Typography variant="body2" noWrap>
                {`${result.name} has ${result.upcoming_event_count} upcoming events`}
            </Typography>

            <List className={classes.artistList}>
                {/* THE API RESPONSE IS GIVING ONLY SINGLE USER DETAILS, NOT A LIST OF USERS
                So, I am not using a loop to display a list, Although I have created UI for list. */}
                <ListItem
                    alignItems="flex-start"
                    className={classes.artistListItem}
                    onClick={setEventsPage}>
                    <ListItemAvatar classes={{root:classes.avatarRoot}}>
                        <Avatar
                            alt={name}
                            src={thumb_url}
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
                                {name}
                            </Typography>
                        }

                        secondary={

                            <Typography
                                component="a"
                                variant="subtitle2"
                                color="textSecondary"
                                onClick={e=>e.stopPropagation()}
                                target="_blank"
                                href={facebook_page_url}
                                className={classes.textAlignment}
                            >
                                {facebook_page_url}
                            </Typography>

                        }
                    />
                </ListItem>
            </List>
        </Container>
    );
};

SearchResults.defaultProps = {
    result : null
};

export default SearchResults;