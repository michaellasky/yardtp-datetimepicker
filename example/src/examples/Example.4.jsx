import React from 'react';
import { DatePicker, TimePicker, useDatePickerState } from 'yardtp-datetimepicker';
import { DateTime } from 'luxon';

// EXAMPLE 4: Restricting selectable dates

export default function Example4 (p) {

    const today = DateTime.local(1985, 10, 26, 1, 21);
    const earliestDate = DateTime.local(1985, 10, 23, 1, 21);
    const latestDate = DateTime.local(1985, 10, 29, 1, 21);
  
    const state = useDatePickerState(today); 
    const [selectedValue, setSelectedValue] = state;
  
    const props = {
        state,
        earliestDate,
        latestDate
    }
  
    return (
        <>
        {selectedValue.toFormat('fff')}
        <DatePicker {...props} />
        <TimePicker {...props} />
        </>
    );
  }