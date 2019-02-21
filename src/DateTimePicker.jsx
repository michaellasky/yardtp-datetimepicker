import React, { useState } from 'react';
import defaultStyles from './defaultStyles';
import CalendarDay from './CalendarDay';
import DateJogger from './DateJogger';
import TimePicker from './TimePicker';
import MonthYearPicker from './MonthYearPicker';
import DatePicker from './DatePicker';

export default function DateTimePicker (props) {
    return (
        <div>
            <DatePicker {...props} />
            <TimePicker {...props} />
        </div>
    );
}

export const MAX_DATE = new Date(9999, 11, 32, 23, 59, 59, 999);
export const MIN_DATE = new Date(1, 0, 1);

export { 
    CalendarDay, 
    DateJogger, 
    TimePicker, 
    MonthYearPicker, 
    DatePicker,
    defaultStyles
};


export function useDatePickerState (value, calVal) {
    const now = new Date();
    return [...useState(value || now),...useState(calVal || value || now)];
}