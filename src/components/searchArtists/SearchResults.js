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

    const classes = useArtistListStyles();
    const {name, thumb_url, facebook_page_url} = result;
    const {setPage} = useContext(StoreContext);

    return (
        <Container fixed>
            <Typography variant="h4" noWrap>
                {`Result found for ${result.name}`}
            </Typography>
            <Typography variant="body2" noWrap>
                {`${result.name} has ${result.upcoming_event_count} upcoming events`}
            </Typography>

            <List className={classes.artistList}>
                <ListItem
                    alignItems="flex-start"
                    className={classes.artistListItem}
                    onClick={()=>{
                        setPage('events');
                    }}>
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