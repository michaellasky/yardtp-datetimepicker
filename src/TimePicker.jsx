import React, { useState } from 'react';
import { DateTime, Duration } from 'luxon';

function TimePicker (props) {

    const [_val, _setVal] = useState(DateTime.local());
    const [value, setValue] = [props.value || _val, props.setValue || _setVal];

    const restrictTimeToDay = props.restrictTimeToDay !== false;
    const interval          = props.intervalStep || 15;
    const timeFormat        = props.format       || DateTime.TIME_SIMPLE;
    const earliestDate      = props.earliestDate || MIN_DATE;
    const latestDate        = props.latestDate   || MAX_DATE;

    if (~~value.minute % interval !== 0) {
        setValue(clampToMinuteInterval(value, interval, earliestDate, latestDate));
    }
    
    function restrictToDay (t, v = value) {
        return DateTime.local(v.year, v.month, v.day, t.hour, t.minute);
    } 

    function addMinutes(num) {
        const time = value.plus(Duration.fromObject({'minutes': num}));

        if (restrictTimeToDay) { return setValue(restrictToDay(time)); }
        else                   { return setValue(time);                }
    }
    
    return (
        <div className="timepicker">
            <label>
                <span className="sr-only">Decrease Time</span>
                <button
                    className="decrease-time-button"
                    onClick={() => addMinutes(-interval)} 
                >&lt;</button>
            </label>
            <div className="time-display">{value.toLocaleString(timeFormat)}</div>
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

export const MAX_DATE = DateTime.fromMillis(253402300799999);
export const MIN_DATE = DateTime.fromMillis(0);

export function clampToMinuteInterval (
    datetime, 
    interval, 
    startBound = MIN_DATE, 
    endBound = MAX_DATE) 
{
    const overflow = datetime.minute % interval;
    
    if (overflow === 0) { return datetime; }

    const deltaMinutes = Duration.fromObject({minutes: interval-overflow});
    const intervalMinutes = Duration.fromObject({minutes: interval});

    const newTime = datetime.plus(deltaMinutes);

    if (newTime < startBound) {
        return clampToMinuteInterval(
            startBound.plus(intervalMinutes), interval, startBound, endBound);
    }
    else if (newTime > endBound) {
        return clampToMinuteInterval(
            endBound.minus(intervalMinutes), interval, startBound, endBound);
    }

    return newTime;
}

export default TimePicker;