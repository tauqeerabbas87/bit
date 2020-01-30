import React, {useContext} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import theme from './../../resources/theme';
import useStyles from './styles';
import SearchArtists from '../searchArtists/SearchArtistsPage';
import ArtistEvents from '../artistEvents/ArtistEventsPage';
import {StoreContext} from "../../context/StoreContext";

const App = () => {
    const classes = useStyles();
    const {page} = useContext(StoreContext);
  return (
      <>
          <ThemeProvider theme={theme}>
          <CssBaseline/>
            <div className={classes.App}>

                    {page === "search" ?
                        <>
                            <div><SearchArtists/> </div>
                            <div className={classes.hidden}><ArtistEvents/> </div>
                        </>
                        :
                        <>
                            <div className={classes.hidden}><SearchArtists/> </div>
                            <div><ArtistEvents/> </div>
                        </>
                    }
            </div>
          </ThemeProvider>
          </>
  );
};

export default App;
