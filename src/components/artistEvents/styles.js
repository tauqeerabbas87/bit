import { makeStyles } from '@material-ui/core/styles';

// 1. useArtistEventsPageStyles Component Styles
export default makeStyles(theme => ({
    artistList: {
        width: '100%',
        display:'flex',
        flexWrap: 'wrap',
        alignItems:'flex-start'
    },
    artistListItem:{
        flex: 1,
        backgroundColor: theme.palette.background.paper,
        boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        margin:"0px 1% 16px 0px",
        height:100,
        [theme.breakpoints.up('md')]: {
            flex: '0 0 50%'
        }
    },
    avatarRoot:{
        minWidth:80
    },
    artistAvatar:{
        width: theme.spacing(8),
        height: theme.spacing(8)
    }
}));

// 1. EventsListItem Component Styles
export const useEventsListItemStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        height:230,
        [theme.breakpoints.up('xs')]: {
            height:200,
        }
    },
    eventDetailHeading:{
        textTransform:'uppercase',
        borderBottom:'#c3c3c3 1px solid',
        marginBottom:10
    }
}));



