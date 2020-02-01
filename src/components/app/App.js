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

        //Function to dispatch action for the
        // APPLICATION STORE REDUCER
        // to redirect on 404 page
        const set404Page = () =>{
            dispatch({
                type:'PAGE',
                payload:'404'
            });
        };

        //Condition to verify if the browser url is other than the origin with /
        // if so, user will be redirected to 404 page
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
                {/*On component render if url is not valid,
                user will be redirected to 404 */}
                {page === '404' ? <Page404 /> :
                    <>
                    {/*Check If PAGE is search Artist or Events of Artists*/}
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
