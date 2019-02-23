import React from 'react';
import injectSheet from 'react-jss';
import fmt from 'date-fns/format';
import setDate from 'date-fns/setDate';
import getDate from 'date-fns/getDate';

import {DateJogger, useDatePickerState, defaultStyles} from './DateTimePicker';

export default function TimePicker ({
    state             = useDatePickerState(),
    restrictTimeToDay = true,
    format            = 'p',
    increaseLabel     = "Increase Time",
    decreaseLabel     = "Decrease Time",
    style             = {}
}) {
    const [value, setValue] = state;
    const combinedStyle     = { ...defaultStyles, ...style };

    const setVal = (v) => restrictTimeToDay? 
                            setValue(setDate(v, getDate(value))): 
                            setValue(v);

    const StyledTimePicker = injectSheet (combinedStyle) ((props) => {
        const classes = {
            ...props.classes, 
            button: props.classes.timeButton, 
            container: props.classes.timePicker 
        };
        const dateJoggerProps = {
            ...props, classes, increaseLabel, decreaseLabel,
            state: [value, setVal], 
        };
        
        return (
            <DateJogger {...dateJoggerProps}>
                <div className={classes.timeDisplay}>{fmt(value, format)}</div>
            </DateJogger>
        );
    });

    return <StyledTimePicker />;
}