import React from 'react';
import injectSheet from 'react-jss';
import { DateJogger, useDatePickerState } from './DateTimePicker';
import format from 'date-fns/format';

export default function MonthYearPicker ({
    state = useDatePickerState(),
    monthFormat   = 'LLLL',
    yearFormat    = 'yyyy',
    increaseLabel = "Next Month", 
    decreaseLabel = "Previous Month",
    style = {}
}) {
    const [ , , value, setValue] = state;

    const month = format(value, monthFormat);
    const year  = format(value, yearFormat);
    
    const StyledMonthYearPicker = injectSheet (style) ((props) => { 
        const classes = {
            ...props.classes, 
            button: props.classes.monthYearButton,
            container: props.classes.monthSelect
        };
        const dateJoggerProps = {
            ...props,
            intervalStep: 1, timeUnit: 'month', 
            state: [value, setValue], 
            classes, increaseLabel, decreaseLabel
        };
        
        return (
            <DateJogger {...dateJoggerProps}>
                <h3 className={classes.monthYearHeading}>{month} {year}</h3>
            </DateJogger>
        );
    });

    return <StyledMonthYearPicker />;
}