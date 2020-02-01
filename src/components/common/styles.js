import { fade, makeStyles } from '@material-ui/core/styles';

// 1. SearchBar Component Styles
export const useAppBarStyles = makeStyles(theme => ({
    appBar:{
        marginBottom:theme.spacing(4),
        paddingBottom:theme.spacing(1)
    },
    title:{
        paddingTop:theme.spacing(1),
        paddingLeft:theme.spacing(5),
        fontFamily:'inherit',
        textTransform:'uppercase',
        [theme.breakpoints.up('md')]: {
            paddingLeft:theme.spacing(4),
        },
    },
    posRel:{
        position:'relative'
    },
    bandIcon:{
        fontSize:29,
        position:'absolute',
        left:theme.spacing(4),
        top:theme.spacing(1)
    },
    searchForm: {
        position: 'relative',
        display:'inline-block',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top:0,
        right:0,
        zIndex:12,
        cursor:'pointer'
    },
    inputRoot: {
        color: 'inherit',
        display:'flex'
    },
    inputInput: {
        padding: theme.spacing(2, 7, 2, 2),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 300,
            '&:focus': {
                width: 350,
            },
        },
        [theme.breakpoints.up('md')]: {
            width: 400,
            '&:focus': {
                width: 650,
            },
        },
    }
}));

// 2. Spinner Component Styles
export const useSpinnerStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));