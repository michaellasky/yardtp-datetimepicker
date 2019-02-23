import React, { useState } from 'react';

const SPACEBAR_KEYCODE = 32;
const ENTER_KEYCODE = 13;

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
    
    function onClick () { if (isInRange) { setSelectedDay(timestamp); } }
    
    function onKeyDown (e) { 
        if (e.keyCode === ENTER_KEYCODE || e.keyCode === SPACEBAR_KEYCODE) {
            e.preventDefault();
            onClick();
        } 
    }

    return (
        <label>
            <a  {...{ 
                onKeyDown, onClick, className, 
                tabIndex: (isInRange? 0: -1) 
            } } >
                <span>{dayOfMonth}</span>
            </a>
        </label>
    );
}
