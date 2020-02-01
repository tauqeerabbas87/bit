import React, {useContext} from 'react';
import { Container, AppBar, Typography, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import QueueMusic from '@material-ui/icons/QueueMusic';
import {useAppBarStyles} from './styles';
import { LightTooltip } from './ToolTip';
import {StoreContext} from "../../context/StoreContext";

const TopBar = ({onSubmit}) => {

    // STYLE object created
    const classes = useAppBarStyles();

    // Destructuring APPLICATION STATE AND DIPATCH method
    const {state, dispatch} = useContext(StoreContext);

    // Destructuring current page and search query from APPLICATION STATE
    const {page, query} = state;

    //DISPATCH action to update search query in APPLICATION STORE
    const setQuery = (query='')=>{
        dispatch({
            type:'QUERY',
            payload:query
        });
    };

    // DISPATCH action to redirect on "Search Artist" PAGE
    const setSearchPage = ()=>{
        dispatch({
            type:'PAGE',
            payload:'search'
        });
    };

    //Submit Form method
    const onFormSubmit = (event) => {
        event.preventDefault();
        setQuery(query);
        // Call onSubmit from parents prop
        onSubmit();
    };

    //Update QUERY value in store on search field change event
    const onChangeHandler = (event) => {
        setQuery(event.target.value);
    };

    return (
        <AppBar position="static" className={classes.appBar}>

                <Container fixed className={classes.posRel}>
                    <Typography className={classes.title} variant="h5" onClick={setSearchPage}  noWrap>
                        <QueueMusic className={classes.bandIcon}/>Bandsintown
                    </Typography>

                    {/*Check if page is "Search Artist or not"*/}
                    {page ==="search"?
                        <form onSubmit={onFormSubmit} className={classes.searchForm}>
                        <LightTooltip title="Type and press enter or click on search icon">
                            <div>
                                <InputBase
                                    placeholder="Search artist"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={query}
                                    autoFocus={true}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={onChangeHandler}
                                />

                                <div className={classes.searchIcon}>
                                    <SearchIcon onClick={onFormSubmit} />
                                </div>
                            </div>
                        </LightTooltip>

                    </form>:null}
                </Container>

        </AppBar>
    );
};

export default TopBar;
