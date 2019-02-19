import React, { useState } from 'react';
import { DateTime, Duration, Interval } from 'luxon';
import defaultStyles from './defaultStyles';
import injectSheet from 'react-jss';
import classnames from 'classnames';

export const MAX_DATE = DateTime.fromMillis(253402300799999);
export const MIN_DATE = DateTime.fromMillis(0);

export function useDatePickerState (value, calVal) {
    const now = DateTime.local();
    return [...useState(value || now),...useState(calVal || value || now)];
}

export default function DateTimePicker (props) {
    return<div><DatePicker {...props} /> <TimePicker {...props} /></div>;
} 

export function DatePicker (props) {
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
                calValue, earliestDate, latestDate, dayNum, weekNum
            } } />;
        });
    });

    const StyledDayName = injectSheet (style) (({classes, children}) =>
        <h4 className={classes.weekDayName}>{children}></h4>
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

export function CalendarDay (props) {
    const now = DateTime.local();
    const [selectedValue, setSelectedValue] = props.state || useState(now);

    const value          = props.value        || now;
    const calValue       = props.calValue     || value;
    const earliestDate   = props.earliestDate || MIN_DATE;
    const latestDate     = props.latestDate   || MAX_DATE; 
    const classes        = props.classes      || {};
    const validDays      = Interval.fromDateTimes(earliestDate, latestDate);  
    const isSelected     = value.toFormat('D') === selectedValue.toFormat('D');
    const isPrevMonth    = value < calValue.startOf('month');
    const isNextMonth    = value > calValue.endOf('month');
    const isPresent      = value.toFormat('yo') === now.toFormat('yo');
    const isInRange      = validDays.start.startOf('day') < value &&
                           validDays.end.endOf('day') > value;           
    
    const classNames = classnames(
        classes.calendarDay, 
        {[`${classes.inRangeDay}`]:       isInRange                    },
        {[`${classes.outOfRangeDay}`]:    !isInRange                   },
        {[`${classes.currentMonthDay}`]:  !isPrevMonth && !isNextMonth },
        {[`${classes.previousMonthDay}`]: isPrevMonth                  },
        {[`${classes.nextMonthDay}`]:     isNextMonth                  },
        {[`${classes.presentDay}`]:       isPresent                    },
        {[`${classes.selectedDay}`]:      isSelected                   }
    );

    return (
        <label className={classNames}>
            <span>{value.day}</span>
            <input {...{ type: "radio", defaultChecked: isSelected, 
                onChange: () => setSelectedValue(value), value: value,   
                className: classes.srOnly, name: "datepicker-day" } }  />
        </label>
    );
}

export function MonthYearPicker (props) {
    const [ , , value, setValue] = props.state || useDatePickerState();
    const monthStr = value.toFormat(props.monthFormat || 'MMMM');
    const yearStr  = value.toFormat(props.yearFormat || 'yyyy');
    const oneMonth = Duration.fromObject({'month': 1});
    
    const StyledMonthYearPicker = injectSheet (props.style) (({ classes }) => 
        <div className={classes.monthSelect}>
            <label> 
                <span className={classes.srOnly}>Previous Month</span>
                <button 
                    className={classes.monthYearButton} 
                    onClick={() => setValue(value.minus(oneMonth))} 
                >&lt;</button>
            </label>
            <h3 className={classes.monthYearHeading}>{monthStr} {yearStr}</h3>
            <label> 
                <span className={classes.srOnly}>Next Month</span>
                <button 
                    className={classes.monthYearButton} 
                    onClick={() => setValue(value.plus(oneMonth))} 
                >&gt;</button>
            </label>
        </div>
    );

    return <StyledMonthYearPicker />;
}

export function TimePicker (props) {
    const [value, setValue] = props.state || useState(DateTime.local());
    const style             = {...defaultStyles, ...props.style};
    const restrictTimeToDay = props.restrictTimeToDay !== false;
    const interval          = props.intervalStep || 15;
    const format            = props.format       || 't';
    
    function restrictTime (t, v = value) {
        return DateTime.local(v.year, v.month, v.day, t.hour, t.minute);
    } 

    function addMinutes(num) {
        const timeDelta = num - ((~~(value.minute) % interval));
        const time = value.plus(Duration.fromObject({'minutes': timeDelta}));

        return restrictTimeToDay? setValue(restrictTime(time)): setValue(time);
    }
    
    const StyledTimePicker = injectSheet (style) (({ classes }) => 
        <div className={classes.timePicker}>
            <label>
                <span className={classes.srOnly}>Decrease Time</span>
                <button
                    className={classes.timeButton}
                    onClick={() => addMinutes(-interval)} 
                >&lt;</button>
            </label>
            <div className={classes.timeDisplay}>{value.toFormat(format)}</div>
            <label>
                <span className={classes.srOnly}>Increase Time</span>
                <button
                    className={classes.timeButton}
                    onClick={() => addMinutes(interval)} 
                >&gt;</button>
            </label>
        </div>
    );

    return <StyledTimePicker />;
}

export const defStyles = defaultStyles;