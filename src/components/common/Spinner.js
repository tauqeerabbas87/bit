import React from 'react';
import {CircularProgress, Backdrop} from '@material-ui/core';
import {useSpinnerStyles} from './styles';

const Spinner = ({spin}) => {

    const classes = useSpinnerStyles();

    return (
        <>
            {spin ?
                <Backdrop className={classes.backdrop} open={spin}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                :
                null
            }
        </>
    );
};

export default Spinner;
