import React from 'react';
import injectSheet from 'react-jss';
import startOfMonth from 'date-fns/startOfMonth';
import getDay from 'date-fns/getDay';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';

import { 
    MonthYearPicker, 
    CalendarDay, 
    defaultStyles, 
    useDatePickerState,
    MIN_DATE, MAX_DATE 
} from './DateTimePicker';

export default function DatePicker (props) {
    const state = props.state || useDatePickerState();
    const [value, setValue, calValue, setCalValue] = state;

    const earliestDate  = props.earliestDate || MIN_DATE;
    const latestDate    = props.latestDate   || MAX_DATE;
    const style         = {...defaultStyles, ...props.style};
    const validDates    = { start: earliestDate, end: latestDate };
    const monthStart    = startOfMonth(calValue);
    const firstCalDay   = subDays(monthStart, getDay(monthStart)); 

    const StyledDay = injectSheet (style) ((p) => <CalendarDay {...p} />);

    // Each calendar week
    const weeks = [...Array(6).keys()].map((weekNum) => {
        
        // Each day in that week
        return [...Array(7).keys()].map((dayNum) => {
            const day = addDays(firstCalDay, weekNum * 7 + dayNum); 
            
            return <StyledDay {...{
                state: [value, (v) => { setCalValue(v); setValue(v);}],
                value: addHours(addMinutes(day, getMinutes(value)), getHours(value)), 
                key: dayNum, calValue, validDates
            } } />;
        });
    });

    const StyledDayName = injectSheet (style) (({classes, children}) =>
        <h4 className={classes.weekDayName}>{children}</h4>
    );

    // ["Mon", "Tues", "Wed",...] starting from locale's first day of week
    const dayNames = [...Array(7).keys()].map((weekDayNumber) => {
        const dayName = format(addDays(firstCalDay, weekDayNumber), 'EEE');
        
        return <StyledDayName key={dayName}>{dayName}</StyledDayName>;
    });

    const StyledDatePicker = injectSheet(style) ((props) => 
        <div className={props.classes.datePicker}>
            <MonthYearPicker {...{...props, state, style }} />
            <div className={props.classes.dayNameHeadings}>{dayNames}</div>
            <div className={props.classes.calendarDays}>{weeks}</div>
        </div>
    );

    if      (isBefore(value, validDates.start)) { setValue(validDates.start); }
    else if (isAfter(value, validDates.end))    { setValue(validDates.end);   }

    return <StyledDatePicker {...props} />;
}