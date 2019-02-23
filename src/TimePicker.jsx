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
    const combinedStyle = { ...defaultStyles, ...style };

    const StyledTimePicker = injectSheet (combinedStyle) (({classes}) => {
        const [value, setValue] = state;
        
        const setVal = (v) => restrictTimeToDay? 
                setValue(setDate(v, getDate(value))): 
                setValue(v);

        const timePickerClasses = {
            ...classes, 
            button: classes.timeButton, 
            container: classes.timePicker 
        };

        const dateJoggerProps = {
            increaseLabel, decreaseLabel,
            state: [value, setVal],
            classes: timePickerClasses 
        };
        
        return (
            <DateJogger {...dateJoggerProps}>
                <div className={classes.timeDisplay}>{fmt(value, format)}</div>
            </DateJogger>
        );
    });

    return <StyledTimePicker />;
}