import React, {useContext, useEffect} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './../../resources/theme';
import appStyles from './styles';
import SearchArtists from '../searchArtists/SearchArtistsPage';
import ArtistEvents from '../artistEvents/ArtistEventsPage';
import Page404 from './../common/Page404';
import {StoreContext} from "../../context/StoreContext";

const App = () => {
    const classes = appStyles();
    const {state, dispatch} = useContext(StoreContext);
    const {page} = state;

    useEffect(()=>{

        const set404Page = () =>{
            dispatch({
                type:'PAGE',
                payload:'404'
            });
        };

        if(document.location.href !== `${document.location.origin}/` && document.location.pathname.split('/').pop() !== '404'){
            document.location.href = "404";
            set404Page();
        }
    },[dispatch]);

  return (
      <>
          <ThemeProvider theme={theme}>
          <CssBaseline/>
            <div className={classes.App}>
                {page === '404' ? <Page404 /> :
                    <>
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
                    </>
                }
            </div>
          </ThemeProvider>
          </>
  );
};

export default App;
