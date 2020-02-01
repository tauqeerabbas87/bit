import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {useEventsListItemStyles} from './styles';
import {formatDate} from './../../helpers';

//This component displays a single event details
const EventsListItem =  ({event}) => {

    const classes = useEventsListItemStyles();

    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper className={classes.paper}>
                    <Typography
                        component="div"
                        variant="caption"
                        color="textPrimary"
                        className={classes.eventDetailHeading}
                    >
                        Event Details
                    </Typography>
                    <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <strong>Country</strong><br/>
                        {event.venue.country}
                    </Grid>
                    <Grid item xs={6}>
                        <strong>City</strong><br/>
                        {event.venue.city}
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Venue</strong><br/>
                        {event.venue.name}
                    </Grid>
                    <Grid item xs={6}>
                        <strong>Date</strong><br/>
                        {formatDate(event.datetime)}
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
        </>
    );
};

EventsListItem.defaultProps = {
    event : null
};

export default EventsListItem;