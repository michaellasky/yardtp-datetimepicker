import React, { useState } from 'react';
import { DateTime, Duration, Interval } from 'luxon';
import classNames from 'classnames';
import { clampToMinuteInterval, MIN_DATE, MAX_DATE } from './TimePicker';

import './DatePickerGrid.scss';

export function useDatePickerState (value, calValue, setVal, setCal) {
    const now = DateTime.local();
    const valState = (setVal)? [value, setVal]: useState(value || now);
    const calState = (setCal)? [calValue, setCal]: useState(calValue || now);
    
    return [...valState, ...calState];
}

function DatePicker (props) {
    const [value, setValue, calValue, setCalValue] = props.state || 
                                                     useDatePickerState();
    const intervalStep = props.intervalStep || 15;
    
    const earliestDate = clampToMinuteInterval(
        props.earliestDate || MIN_DATE, 
        intervalStep);

    const latestDate = clampToMinuteInterval(
        props.latestDate || MAX_DATE, 
        intervalStep);
    
    const monthStart = calValue.startOf('month');
    const weekdayOf1st = Duration.fromObject({days: monthStart.weekday});
    const firstDisplayedDay = monthStart.minus(weekdayOf1st); 
    
    // Each calendar week
    const weeks = [...Array(6).keys()].map((weekNum) => {
        
        // Each day in that week
        return [...Array(7).keys()].map((dayInWeek) => {
            const dayNumber = weekNum * 7 + dayInWeek;
            const timeFromDayZero = Duration.fromObject({
                days: dayNumber,
                hours: value.hour, 
                minutes: value.minute
            });            

            return (
                <DatePickerDayInput {...{
                    className: `day day-${dayInWeek+1} week-${weekNum+1}`,
                    key: dayNumber,
                    state: [value, (v) => { setCalValue(v); setValue(v);}],
                    value: firstDisplayedDay.plus(timeFromDayZero), 
                    calValue: calValue,
                    earliestDate: earliestDate,
                    latestDate: latestDate,
                } } />
            );
        });
    });

    // ["Mon", "Tues", "Wed",...] localized and wrapped in h4
    const dayNames = [...Array(7).keys()].map((weekDayNumber) => {
        const weekStartDelta = Duration.fromObject({days: weekDayNumber});
        const dayName = firstDisplayedDay.plus(weekStartDelta).toFormat('EEE');
        
        return <h4 key={dayName}>{dayName}</h4>
    });

    if      (value < earliestDate)  { setValue(earliestDate); }
    else if (value > latestDate)    { setValue(latestDate);   }
    
    return (
        <div className="date-picker">
            <MonthYearPicker {...{...props, state: [calValue, setCalValue]}} />
            <div className="day-name-headings">{dayNames}</div>
            <div className="calendar-days">{weeks}</div>
        </div>
    );
}

export function DatePickerDayInput (props) {
    const now = DateTime.local();
    const [selectedValue, setSelectedValue] = props.state || useState(now);
    
    const value         = props.value        || now;
    const calendarValue = props.calValue     || value;
    const earliestDate  = props.earliestDate || MIN_DATE;
    const latestDate    = props.latestDate   || MAX_DATE;
    const validDates    = Interval.fromDateTimes(earliestDate, latestDate);
    const selected      = value.toFormat('D') === selectedValue.toFormat('D');
    
    const classes = classNames(
        props.className, 
        { 
            "selected":       selected,
            "selectable":     validDates.contains(value),
            "out-of-range":   !validDates.contains(value),
            "previous-month": value < calendarValue.startOf('month'),
            "current-month":  value.month === calendarValue.month,
            "next-month":     value > calendarValue.endOf('month'),
            "past":           value < now && value.day !== now.day,
            "present":        value.toFormat('yo') === now.toFormat('yo'),
            "future":         value > now && value.day !== now.day 
        }
    );

    return (
        <label className={classes}>
            {value.day}
            <input type="radio" 
                className="sr-only"
                onChange={() => setSelectedValue(value)} 
                selected={selected}
                name="datepicker-day"  
                value={value} />
        </label>
    );
}

export function MonthYearPicker (props) {
    const [value, setValue] = props.state || useState(DateTime.local());

    const monthStr = value.toFormat(props.monthFormat || 'MMMM');
    const yearStr  = value.toFormat(props.yearFormat || 'yyyy');
    const oneMonth = Duration.fromObject({'month': 1});
    
    return (
        <div className="month-select">
            <label> 
                <span className="sr-only">Previous Month</span>
                <button 
                    className="prev-month-button" 
                    onClick={() => setValue(value.minus(oneMonth))} 
                >&lt;</button>
            </label>
            
            <h3 className="month-year">{monthStr} {yearStr}</h3>
            
            <label> 
                <span className="sr-only">Next Month</span>
                <button 
                    className="next-month-button" 
                    onClick={() => setValue(value.plus(oneMonth))} 
                >&gt;</button>
            </label>
        </div>
    );
}

export default DatePicker;