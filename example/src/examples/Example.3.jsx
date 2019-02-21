import React from 'react';
import DateTimePicker, { DatePicker, TimePicker, useDatePickerState } from 'yardtp-datetimepicker';
import format from 'date-fns/format';

// EXAMPLE 3: Using DatePicker and TimePicker together

export default function Example3 (props) {

    const state = useDatePickerState(); 
  
    // We can ignore the calendarValue states while still using useDatePickerState();
    const [selectedValue, setSelectedValue] = state;
  
    return (
        <>
        {format(selectedValue, 'MMMM d, y p')}
        <DatePicker state={state} />
        <TimePicker state={state} />
        
        or

        <DateTimePicker state={state} />
        </>
    );
  }