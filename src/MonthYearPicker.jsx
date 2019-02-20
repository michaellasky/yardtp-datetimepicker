import React from 'react';
import injectSheet from 'react-jss';
import { DateJogger, useDatePickerState } from './DateTimePicker';

export default function MonthYearPicker (props) {
    const [ , , value, setValue] = props.state || useDatePickerState();
    const month         = value.toFormat(props.monthFormat || 'MMMM');
    const year          = value.toFormat(props.yearFormat || 'yyyy');
    const increaseLabel = props.increaseLabel || "Next Month";
    const decreaseLabel = props.decreaseLabel || "Previous Month";

    const StyledMonthYearPicker = injectSheet (props.style) ((props) => { 
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