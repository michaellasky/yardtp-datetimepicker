
import React from 'react';
import { DateTime, Duration, Interval } from 'luxon';
import injectSheet from 'react-jss';
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
    const validDates    = Interval.fromDateTimes(earliestDate, latestDate);
    const monthStart    = calValue.startOf('month');
    const weekdayOf1st  = Duration.fromObject({days: monthStart.weekday});
    const firstCalDay   = monthStart.minus(weekdayOf1st); 

    const StyledDay = injectSheet (style) ((p) => <CalendarDay {...p} />);

    // Each calendar week
    const weeks = [...Array(6).keys()].map((weekNum) => {
        
        // Each day in that week
        return [...Array(7).keys()].map((dayNum) => {
            const dayNumber = weekNum * 7 + dayNum;
            const timeFromDayZero = Duration.fromObject({
                days: dayNumber,
                hours: value.hour, 
                minutes: value.minute
            });            

            return <StyledDay {...{
                key: dayNumber, 
                state: [value, (v) => { setCalValue(v); setValue(v);}],
                value: firstCalDay.plus(timeFromDayZero), 
                calValue, validDates, dayNum, weekNum
            } } />;
        });
    });

    const StyledDayName = injectSheet (style) (({classes, children}) =>
        <h4 className={classes.weekDayName}>{children}</h4>
    );

    // ["Mon", "Tues", "Wed",...] starting from locale's first day of week
    const dayNames = [...Array(7).keys()].map((weekDayNumber) => {
        const weekStartDelta = Duration.fromObject({days: weekDayNumber});
        const dayName = firstCalDay.plus(weekStartDelta).toFormat('EEE');
        
        return <StyledDayName key={dayName}>{dayName}</StyledDayName>;
    });

    const StyledDatePicker = injectSheet(style) ((props) => 
        <div className={props.classes.datePicker}>
            <MonthYearPicker {...{...props, state, style }} />
            <div className={props.classes.dayNameHeadings}>{dayNames}</div>
            <div className={props.classes.calendarDays}>{weeks}</div>
        </div>
    );

    if      (validDates.start > value) { setValue(validDates.start); }
    else if (validDates.end   < value) { setValue(validDates.end);   }

    return <StyledDatePicker {...props} />;
}