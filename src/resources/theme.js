import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/green';

const insideTheme = createMuiTheme();

export default createMuiTheme({
    palette: {
        primary: indigo,
        secondary: red,
    },
    typography:{
        h4:{
            fontSize:'3rem',
            [insideTheme.breakpoints.up('sm')]: {
                fontSize: '2rem',
            }
        },
        h5:{
            fontSize:'1.7rem',
            [insideTheme.breakpoints.up('sm')]: {
                fontSize: '1.3rem',
            }
        },
        body2:{
            fontSize:'1.2rem',
            [insideTheme.breakpoints.up('sm')]: {
                fontSize: '1rem',
            }
        },
        subtitle2:{
            fontSize:'1rem',
            [insideTheme.breakpoints.up('sm')]: {
                fontSize: '0.8rem',
            }
        },
        caption:{
            fontSize:'1.8rem',
            [insideTheme.breakpoints.up('sm')]: {
                fontSize: '1.2rem',
            }
        }

    }
});
