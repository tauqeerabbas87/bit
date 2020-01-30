import React, {useContext, useState, useEffect} from 'react';
import { Container, AppBar, Typography, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import QueueMusic from '@material-ui/icons/QueueMusic';
import { LightTooltip } from './ToolTip';
import {useAppBarStyles} from './styles';
import {StoreContext} from "../../context/StoreContext";

const SearchArtistsPage = ({onSubmit}) => {
    const classes = useAppBarStyles();

    const {setTerm, page} = useContext(StoreContext);

    // 1. Set search field value
    const [searchField, setSearchField] = useState('');

    const onFormSubmit = (event) => {
        event.preventDefault();
        setTerm(searchField);
        sessionStorage.setItem('searchFieldData', searchField);
        onSubmit(searchField);
    };

    const onChangeHandler = (event) => {
        setSearchField(event.target.value);
    };

    useEffect(()=>{

    });

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
                                    value={searchField}
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
