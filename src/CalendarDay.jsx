import React, { useState } from 'react';
import { DateTime, Interval } from 'luxon';
import { MIN_DATE, MAX_DATE } from './DateTimePicker';

export default function CalendarDay (props) {
    const now = DateTime.local();
    const [selectedValue, setSelectedValue] = props.state || useState(now);

    const minMaxDates    = Interval.fromDateTimes(MIN_DATE, MAX_DATE);
    const value          = props.value        || now;
    const calValue       = props.calValue     || value;
    const classes        = props.classes      || {};
    const validDates     = props.validDates   || minMaxDates;
    
    const name           = `day-${value.toFormat('X')}`;
    const isSelected     = value.toFormat('D') === selectedValue.toFormat('D');
    const isPrevMonth    = value < calValue.startOf('month');
    const isNextMonth    = value > calValue.endOf('month');
    const isPresent      = value.toFormat('yo') === now.toFormat('yo');
    const isInRange      = validDates.start.startOf('day') < value &&
                           validDates.end.endOf('day') > value;           
    
    const classNames = 
        `${classes.calendarDay} `                                       + 
        `${isInRange? classes.inRangeDay: classes.outOfRangeDay} `      + 
        `${!isPrevMonth && !isNextMonth? classes.currentMonthDay: ''} ` + 
        `${isPrevMonth? classes.previousMonthDay: ''} `                 + 
        `${isNextMonth? classes.nextMonthDay: ''} `                     + 
        `${isPresent? classes.presentDay: ''}  `                        +
        `${isSelected? classes.selectedDay: ''} `                       ;
    
    function setDay() { if (isInRange) { setSelectedValue(value); } }

    return (
        <label >
            <a  href={`#${name}`} 
                onClick={setDay} 
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