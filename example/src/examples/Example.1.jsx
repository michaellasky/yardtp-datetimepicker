import React from 'react';
import { DatePicker, useDatePickerState } from 'yardtp-datetimepicker/';
import format from 'date-fns/format';

// EXAMPLE 1: DatePicker basic usage

export default function Example1 (props) {

    // useDatePickerState will default to today
    const state = useDatePickerState(); 
    const [selectedValue, setSelectedValue, calendarValue, setCalendarValue] = state;

    return (
        <>
        {format(selectedValue, 'MMMM d, y')} - {format(calendarValue, 'MMMM d, y')}
        <DatePicker state={state} />
        </>
    );
}