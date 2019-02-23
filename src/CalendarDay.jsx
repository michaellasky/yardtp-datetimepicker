import React from 'react';

export default function CalendarDay ({
    setSelectedDay = (() => {}),
    timestamp      = 0,
    classes        = {},
    dayOfMonth, isPrevMonth, isNextMonth, isInRange, isSameDay, isSelected
}) {

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
