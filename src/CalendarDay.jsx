import React, { useState } from 'react';
import getUnixTime from 'date-fns/getUnixTime';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import getDate from 'date-fns/getDate';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';

import { MIN_DATE, MAX_DATE } from './DateTimePicker';

export default function CalendarDay (props) {
    const now = new Date();
    const [selectedValue, setSelectedValue] = props.state || useState(now);

    const value       = props.value      || now;
    const calValue    = props.calValue   || value;
    const classes     = props.classes    || {};
    const validDates  = props.validDates || { start: MIN_DATE, end: MAX_DATE };
    
    const isSelected  = isSameDay(value, selectedValue);
    const isPrevMonth = differenceInCalendarMonths(value, calValue) < 0;
    const isNextMonth = differenceInCalendarMonths(value, calValue) > 0;
    const isInRange   = isWithinInterval(startOfDay(value), validDates) || 
                        isWithinInterval(endOfDay(value), validDates);           

    const classNames = 
        `${classes.calendarDay} `                                       + 
        `${isInRange? classes.inRangeDay: classes.outOfRangeDay} `      + 
        `${!isPrevMonth && !isNextMonth? classes.currentMonthDay: ''} ` + 
        `${isPrevMonth? classes.previousMonthDay: ''} `                 + 
        `${isNextMonth? classes.nextMonthDay: ''} `                     + 
        `${isSameDay(value, new Date())? classes.presentDay: ''}  `     +
        `${isSelected? classes.selectedDay: ''} `                       ;
    
    function setDay() { if (isInRange) { setSelectedValue(value); } }

    return (
        <label >
            <a  href={`#day-${getUnixTime(value)}`} 
                onClick={setDay} 
                className={classNames}>
               
                <span>{getDate(value)}</span>
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