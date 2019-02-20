import React, { useState } from 'react';
import { DateTime } from 'luxon';
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

export const MAX_DATE = DateTime.fromMillis(253402300799999);
export const MIN_DATE = DateTime.fromMillis(0);

export { 
    CalendarDay, 
    DateJogger, 
    TimePicker, 
    MonthYearPicker, 
    DatePicker,
    defaultStyles
};


export function useDatePickerState (value, calVal) {
    const now = DateTime.local();
    return [...useState(value || now),...useState(calVal || value || now)];
}