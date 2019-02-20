import React, { useState } from 'react';
import { DateTime, Duration, Interval } from 'luxon';
import defaultStyles from './defaultStyles';
import injectSheet from 'react-jss';

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

export function CalendarDay (props) {
    const now = DateTime.local();
    const [selectedValue, setSelectedValue] = props.state || useState(now);

    const value          = props.value        || now;
    const calValue       = props.calValue     || value;
    const classes        = props.classes      || {};
    const minMaxDates    = Interval.fromDateTimes(MIN_DATE, MAX_DATE);
    const validDates     = props.validDates   || minMaxDates;

    const isSelected     = value.toFormat('D') === selectedValue.toFormat('D');
    const isPrevMonth    = value < calValue.startOf('month');
    const isNextMonth    = value > calValue.endOf('month');
    const isPresent      = value.toFormat('yo') === now.toFormat('yo');
    const isInRange      = validDates.start.startOf('day') < value &&
                           validDates.end.endOf('day') > value;           
    
    const classNames = `
        ${classes.calendarDay} 
        ${isInRange? classes.inRangeDay: classes.outOfRangeDay} 
        ${!isPrevMonth && !isNextMonth? classes.currentMonthDay: ''} 
        ${isPrevMonth? classes.previousMonthDay: ''} 
        ${isNextMonth? classes.nextMonthDay: ''} 
        ${isPresent? classes.presentDay: ''} 
        ${isSelected? classes.selectedDay: ''}`;
    
    function selectThisDay() { if (isInRange) { setSelectedValue(value); } }

    return (
        <label >
            <a href="javascript: return void;"
               onClick={selectThisDay} 
               className={classNames}>
            <span>{value.day}</span>
            <input {...{  
                type: "radio", 
                defaultChecked: isSelected, 
                value: value,   
                tabIndex: 0,
                className: classes.srOnly, 
                name: "datepicker-day",
                disabled: !isInRange } } />

            </a>
        </label>
    );
}

export function MonthYearPicker (props) {
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

export function TimePicker (props) {
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

export function DateJogger (props) {
    const [value, setValue] = props.state         || useDatePickerState();
    const classes           = props.classes       || {};
    const interval          = props.intervalStep  || 15;
    const timeUnit          = props.timeUnit      || 'minute';

    function jog(reverse = false) {
        const num = reverse? -interval: interval;
        const delta = num - ((~~(value[timeUnit]) % interval));

        setValue(value.plus(Duration.fromObject({[`${timeUnit}s`]: delta})));
    }

    return (
        <div className={classes.container}>
            <label name="decrement">
                <span className={classes.srOnly}>{props.decreaseLabel}</span>
                <button className={classes.button} onClick={() => jog(true)} >
                    &lt;
                </button>
            </label>
            {props.children}
            <label name="increment">
                <span className={classes.srOnly}>{props.increaseLabel}</span>
                <button className={classes.button} onClick={() => jog(false)}>
                    &gt;
                </button>
            </label>
        </div>
    );
}

export const defStyles = defaultStyles;