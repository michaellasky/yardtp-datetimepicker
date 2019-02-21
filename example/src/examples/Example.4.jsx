import React from 'react';
import { DatePicker, TimePicker, useDatePickerState } from 'yardtp-datetimepicker';
import format from 'date-fns/format';

// EXAMPLE 4: Restricting selectable dates

export default function Example4 (p) {

    const today = new Date(1985, 9, 26, 1, 21);
    const earliestDate = new Date(1985, 9, 23, 1, 21);
    const latestDate = new Date(1985, 9, 29, 1, 21);
  
    const state = useDatePickerState(today); 
    const [selectedValue, setSelectedValue] = state;
  
    const props = {
        state,
        earliestDate,
        latestDate
    }
  
    return (
        <>
        {format(selectedValue, 'MMMM d, y p')}
        <DatePicker {...props} />
        <TimePicker {...props} />
        </>
    );
  }