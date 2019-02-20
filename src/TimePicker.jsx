import React from 'react';
import { DateTime } from 'luxon';
import injectSheet from 'react-jss';
import { 
    DateJogger, 
    useDatePickerState, 
    defaultStyles 
} from './DateTimePicker';

export default function TimePicker (props) {
    const style             = { ...defaultStyles, ...props.style };
    const [value, setValue] = props.state         || useDatePickerState();
    const restrictTime      = props.restrictTimeToDay !== false;
    const fmt               = props.format        || 't';
    const increaseLabel     = props.increaseLabel || "Increase Time";
    const decreaseLabel     = props.decreaseLabel || "Decrease Time";

    function restrict (t, v = value) {
        return DateTime.local(v.year, v.month, v.day, t.hour, t.minute);
    } 

    const setVal = (v) => restrictTime? setValue(restrict(v)): setValue(v);
    
    const StyledTimePicker = injectSheet (style) ((props) => {
        const classes = {
            ...props.classes, 
            button: props.classes.timeButton, 
            container: props.classes.timePicker 
        };
        const dateJoggerProps = {
            ...props, 
            state: [value, setVal], 
            classes, increaseLabel, decreaseLabel
        };
        
        return (
            <DateJogger {...dateJoggerProps}>
              <div className={classes.timeDisplay}>{value.toFormat(fmt)}</div>
            </DateJogger>
        );
    });

    return <StyledTimePicker />;
}