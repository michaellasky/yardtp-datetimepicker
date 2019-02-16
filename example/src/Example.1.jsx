import React from 'react';
import DatePicker, { useDatePickerState } from 'yardtp-datetimepicker';

// EXAMPLE 1: DatePicker basic usage

export default function Example1 (props) {

    // useDatePickerState will default to today
    const state = useDatePickerState(); 
    const [selectedValue, setSelectedValue, calendarValue, setCalendarValue] = state;

    return (
        <>
        {selectedValue.toFormat('DD')} - {calendarValue.toFormat('DD')}
        <DatePicker state={state} />
        </>
    );
}