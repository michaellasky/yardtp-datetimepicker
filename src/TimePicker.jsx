import React from 'react';
import injectSheet from 'react-jss';
import format from 'date-fns/format';
import setDate from 'date-fns/setDate';
import getDate from 'date-fns/getDate';

import { 
    DateJogger, 
    useDatePickerState, 
    defaultStyles 
} from './DateTimePicker';

export default function TimePicker (props) {
    const style             = { ...defaultStyles, ...props.style };
    const [value, setValue] = props.state         || useDatePickerState();
    const restrictTime      = props.restrictTimeToDay !== false;
    const fmt               = props.format        || 'p';
    const increaseLabel     = props.increaseLabel || "Increase Time";
    const decreaseLabel     = props.decreaseLabel || "Decrease Time";

    function setVal (v) { 
        return restrictTime? setValue(setDate(v, getDate(value))): setValue(v);
    }
    
    const StyledTimePicker = injectSheet (style) ((props) => {
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
              <div className={classes.timeDisplay}>{format(value, fmt)}</div>
            </DateJogger>
        );
    });

    return <StyledTimePicker />;
}