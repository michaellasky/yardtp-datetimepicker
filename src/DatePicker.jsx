import React from 'react';
import injectSheet from 'react-jss';
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfMonth from 'date-fns/startOfMonth';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import getDay from 'date-fns/getDay';
import getDate from 'date-fns/getDate';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import isSameDay from 'date-fns/isSameDay';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';

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
    const range         = { start: earliestDate, end: latestDate };
    const monStart      = startOfMonth(calValue);
    const firstCalDay   = subDays(monStart, getDay(monStart)); 
    const today         = new Date();

    const StyledDay = injectSheet (style) ((p) => <CalendarDay {...p} />);

    const setSelectedDay = (ts) => {
        setValue(fromUnixTime(ts));
        setCalValue(fromUnixTime(ts));
    }

    // Each calendar week
    const weeks = [...Array(6).keys()].map((weekNum) => {
        
        // Each day in that week
        return [...Array(7).keys()].map((dayNum) => {
            const numDays = weekNum * 7 + dayNum;
            const [valHours, valMin] = [getHours(value), getMinutes(value)];
            const midnight = addDays(firstCalDay, numDays);
            const day = addHours(addMinutes(midnight, valMin), valHours);
            
            return <StyledDay {...{
                setSelectedDay, 
                timestamp:   getUnixTime(day),
                dayOfMonth:  getDate(day),
                isSelected:  isSameDay(day, value),
                isSameDay:   isSameDay(day, today),
                isPrevMonth: differenceInCalendarMonths(day, calValue) <0,
                isNextMonth: differenceInCalendarMonths(day, calValue) >0,
                isInRange:   isWithinInterval(startOfDay(day), range) || 
                             isWithinInterval(endOfDay(day), range),
                key: dayNum
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

    if      (isBefore(value, range.start)) { setValue(range.start); }
    else if (isAfter(value, range.end))    { setValue(range.end);   }

    return <StyledDatePicker {...props} />;
}