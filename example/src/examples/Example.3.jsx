import React from 'react';
import DatePicker, { TimePicker, useDatePickerState } from 'yardtp-datetimepicker';

// EXAMPLE 3: Using DatePicker and TimePicker together

export default function Example3 (props) {

    const state = useDatePickerState(); 
  
    // We can ignore the calendarValue states while still using useDatePickerState();
    const [selectedValue, setSelectedValue] = state;
  
    return (
        <>
        {selectedValue.toFormat('fff')}
        <DatePicker state={state} />
        <TimePicker state={state} />
        </>
    );
  }