import React, {useContext} from 'react';
import { Container, AppBar, Typography, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import QueueMusic from '@material-ui/icons/QueueMusic';
import { LightTooltip } from './ToolTip';
import {useAppBarStyles} from './styles';
import {StoreContext} from "../../context/StoreContext";

const SearchArtistsPage = ({onSubmit}) => {
    const classes = useAppBarStyles();

    const {state, dispatch} = useContext(StoreContext);
    const {page, query} = state;

    const setQuery = (query='')=>{
        dispatch({
            type:'QUERY',
            payload:query
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        setQuery(query);
        onSubmit();
    };

    const onChangeHandler = (event) => {
        setQuery(event.target.value);
    };

    return (
        <AppBar position="static" className={classes.appBar}>

                <Container fixed className={classes.posRel}>
                <Typography className={classes.title} variant="h5" noWrap>
                    <QueueMusic className={classes.bandIcon}/>Bandsintown
                </Typography>
                    {page ==="search"?
                        <form onSubmit={onFormSubmit} className={classes.searchForm}>
                        <LightTooltip title="Type and press enter or click on search icon">
                            <div>
                                <InputBase
                                    placeholder="Search…"
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

export default SearchArtistsPage;
