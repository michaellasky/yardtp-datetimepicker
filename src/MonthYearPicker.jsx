import React from 'react';
import { DateJogger, useDatePickerState } from './DateTimePicker';
import format from 'date-fns/format';

export default function MonthYearPicker ({
    state = useDatePickerState(),
    classes = {},
    monthFormat   = 'LLLL',
    yearFormat    = 'yyyy',
    increaseLabel = "Next Month", 
    decreaseLabel = "Previous Month"
}) {
    const [ , , value, setValue] = state;

    const month = format(value, monthFormat);
    const year  = format(value, yearFormat);
    
    const dateJoggerClasses = {
        ...classes, 
        button: classes.monthYearButton,
        container: classes.monthSelect
    };

    const dateJoggerProps = {
        intervalStep: 1, timeUnit: 'month', 
        state: [value, setValue], 
        classes: dateJoggerClasses, 
        increaseLabel, decreaseLabel
    };
    
    return (
        <DateJogger {...dateJoggerProps}>
            <h3 className={classes.monthYearHeading}>{month} {year}</h3>
        </DateJogger>
    );
}