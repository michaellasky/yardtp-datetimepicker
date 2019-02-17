import React from 'react';
import { TimePicker, useDatePickerState } from 'yardtp-datetimepicker';

// EXAMPLE 2: TimePicker basic usage

export default function Example2 (props) {

    const state = useDatePickerState(); 
  
    // We can ignore the calendarValue states while still using useDatePickerState();
    const [selectedValue, setSelectedValue] = state;
  
    return (
        <>
        {selectedValue.toFormat('t')}
        <TimePicker state={state} />
        </>
    );
  }