import { makeStyles } from '@material-ui/core/styles';

// 1. useSearchArtistsPageStyles Component Styles
export default makeStyles(theme => ({

}));


// 2. SearchResult Component Styles
export const useArtistListStyles = makeStyles(theme => ({
    artistList: {
        width: '100%',
        display:'flex',
        flexWrap: 'wrap',
        alignItems:'flex-start'
    },
    artistListItem:{
        flex: 1,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor: theme.palette.background.paper,
        boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        margin:"0px 1% 16px 0px",
        minHeight:100,
        cursor:"pointer",
        [theme.breakpoints.up('sm')]: {
            flexDirection:'row',
            alignItems:'flex-start'
        },
        [theme.breakpoints.up('md')]: {
            flex: '0 0 50%',
        }
    },
    avatarRoot:{
        minWidth:80
    },
    textAlignment:{
        textAlign:'center',
        wordBreak:'break-all',
        [theme.breakpoints.up('sm')]: {
            textAlign:'left'
        }
    },
    artistAvatar:{
        width: theme.spacing(12),
        height: theme.spacing(12),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        }
    }
}));

