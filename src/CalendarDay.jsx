import React from 'react';

export default function CalendarDay (props) {
    const setSelectedDay = props.setSelectedDay || (() => {});
    const dayOfMonth     = props.dayOfMonth     || 42;
    const timestamp      = props.timestamp      || 0;
    const classes        = props.classes        || {};
    const isPrevMonth    = props.isPrevMonth    !== false;
    const isNextMonth    = props.isNextMonth    !== false;
    const isInRange      = props.isInRange      === true;
    const isSameDay      = props.isSameDay      !== false;
    const isSelected     = props.isSelected     !== false;

    const className = 
        `${classes.calendarDay} `                                       + 
        `${isInRange? classes.inRangeDay: classes.outOfRangeDay} `      + 
        `${!isPrevMonth && !isNextMonth? classes.currentMonthDay: ''} ` + 
        `${isPrevMonth? classes.previousMonthDay: ''} `                 + 
        `${isNextMonth? classes.nextMonthDay: ''} `                     + 
        `${isSameDay? classes.presentDay: ''}  `                        +
        `${isSelected? classes.selectedDay: ''} `                       ;
    
    function onClick() { if (isInRange) { setSelectedDay(timestamp); } }

    return (
        <label>
            <a  {...{ href: `#day-${timestamp}`, onClick, className } } >
                <span>{dayOfMonth}</span>
            </a>
        </label>
    );
}