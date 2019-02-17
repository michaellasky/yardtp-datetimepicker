import React, { useState } from 'react';
import { DateTime, Duration, Interval } from 'luxon';
import classNames from 'classnames';

export const MAX_DATE = DateTime.fromMillis(253402300799999);
export const MIN_DATE = DateTime.fromMillis(0);

export function useDatePickerState (value, calVal) {
    const now = DateTime.local();
    return [...useState(value || now),...useState(calVal || value || now)];
}

export default function DateTimePicker (props) {
    return (
        <div className="yardtp-datetimepicker">
        <DatePicker {...props} /> <TimePicker {...props} />
        </div>
    );
}

export function DatePicker (props) {
    const [value, setValue, calValue, setCalValue] = props.state || 
                                                     useDatePickerState();
    const earliestDate  = props.earliestDate || MIN_DATE;
    const latestDate    = props.latestDate   || MAX_DATE;
    const validDates    = Interval.fromDateTimes(earliestDate, latestDate);
    const monthStart    = calValue.startOf('month');
    const weekdayOf1st  = Duration.fromObject({days: monthStart.weekday});
    const firstCalDay   = monthStart.minus(weekdayOf1st); 
    
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
                <CalendarDay {...{
                    className: `day day-${dayInWeek+1} week-${weekNum+1}`,
                    key: dayNumber,
                    state: [value, (v) => { setCalValue(v); setValue(v);}],
                    value: firstCalDay.plus(timeFromDayZero), 
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
        const dayName = firstCalDay.plus(weekStartDelta).toFormat('EEE');
        
        return <h4 key={dayName}>{dayName}</h4>
    });

    if      (validDates.start > value) { setValue(validDates.start); }
    else if (validDates.end   < value) { setValue(validDates.end);   }

    return (
        <div className="yardtp-datepicker">
            <MonthYearPicker {...{...props, state: [calValue, setCalValue]}} />
            <div className="day-name-headings">{dayNames}</div>
            <div className="calendar-days">{weeks}</div>
        </div>
    );
}

export function CalendarDay (props) {
    const now = DateTime.local();
    const [selectedValue, setSelectedValue] = props.state || useState(now);
    const value         = props.value        || now;
    const calendarValue = props.calValue     || value;
    const earliestDate  = props.earliestDate || MIN_DATE;
    const latestDate    = props.latestDate   || MAX_DATE;
    const selected      = value.toFormat('D') === selectedValue.toFormat('D');
    const validDays     = Interval.fromDateTimes(earliestDate, latestDate);  
    const inRange       = validDays.start.startOf('day') < value &&
                          validDays.end.endOf('day') > value;
                          
    const classes = classNames(
        props.className, 
        { 
            "selected":       selected,
            "selectable":     inRange,
            "out-of-range":   !inRange,
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
            <span>{value.day}</span>
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

export function TimePicker (props) {
    const [value, setValue] = props.state || useState(DateTime.local());
    const restrictTimeToDay = props.restrictTimeToDay !== false;
    const interval          = props.intervalStep || 15;
    const format            = props.format       || 't';
    
    function restrictTime (t, v = value) {
        return DateTime.local(v.year, v.month, v.day, t.hour, t.minute);
    } 

    function addMinutes(num) {
        const overflow = (~~(value.minute) % interval);
        const addedMinutes = Duration.fromObject({'minutes': num-overflow});
        const time = value.plus(addedMinutes);

        return restrictTimeToDay? setValue(restrictTime(time)): setValue(time);
    }
    
    return (
        <div className="yardtp-timepicker">
            <label>
                <span className="sr-only">Decrease Time</span>
                <button
                    className="decrease-time-button"
                    onClick={() => addMinutes(-interval)} 
                >&lt;</button>
            </label>
            <div className="time-display">{value.toFormat(format)}</div>
            <label>
                <span className="sr-only">Increase Time</span>
                <button
                    className="increase-time-button"
                    onClick={() => addMinutes(interval)} 
                >&gt;</button>
            </label>
        </div>
    );
}