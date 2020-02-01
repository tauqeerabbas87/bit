import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
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
