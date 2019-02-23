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

export default function DatePicker ({
    state        = useDatePickerState(),
    earliestDate = MIN_DATE, 
    latestDate   = MAX_DATE,
    style
}) {
    const StyledDatePicker = injectSheet({...defaultStyles, ...style}) (({ classes }) => {

        const [value, setValue, calValue, setCalValue] = state;

        const range         = { start: earliestDate, end: latestDate };
        const monthStart    = startOfMonth(calValue);
        const firstCalDay   = subDays(monthStart, getDay(monthStart)); 
        const today         = new Date();
    
        const setSelectedDay = (ts) => {setValue(fromUnixTime(ts));
            setCalValue(fromUnixTime(ts));
        }
    
        // Each calendar week
        const weeks = [...Array(6).keys()].map((weekNum) => {
            
            // Each day in that week
            return [...Array(7).keys()].map((dayNum) => {
                const [valHours, valMin] = [getHours(value), getMinutes(value)];
                const midnight = addDays(firstCalDay, weekNum * 7 + dayNum);
                const day = addHours(addMinutes(midnight, valMin), valHours);
                
                return <CalendarDay {...{
                    setSelectedDay, classes,
                    key:         dayNum,
                    timestamp:   getUnixTime(day),
                    dayOfMonth:  getDate(day),
                    isSelected:  isSameDay(day, value),
                    isSameDay:   isSameDay(day, today),
                    isPrevMonth: differenceInCalendarMonths(day, calValue) < 0,
                    isNextMonth: differenceInCalendarMonths(day, calValue) > 0,
                    isInRange:   isWithinInterval(startOfDay(day), range) || 
                                 isWithinInterval(endOfDay(day), range)
                } } />;
            });
        });
    
        // ["Mon", "Tues", "Wed",...] starting from locale's first day of week
        const dayNames = [...Array(7).keys()].map( (weekDayNumber) => {
            const dayName = format(addDays(firstCalDay, weekDayNumber), 'EEE');
            
            return <h4 key={dayName} className={classes.weekDayName}>{dayName}</h4>;
        });

        if      (isBefore(value, range.start)) { setValue(range.start); }
        else if (isAfter(value, range.end))    { setValue(range.end);   }

        return (
            <div className={classes.datePicker}>
                <MonthYearPicker {...{state, classes }} />
                <div className={classes.dayNameHeadings}>{dayNames}</div>
                <div className={classes.calendarDays}>{weeks}</div>
            </div>
        );
    });

    return <StyledDatePicker {...{state, earliestDate, latestDate, style} } />;
}