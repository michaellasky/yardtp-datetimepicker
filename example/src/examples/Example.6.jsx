import React from 'react';
import { DatePicker, TimePicker, useDatePickerState } from 'yardtp-datetimepicker';
import format from 'date-fns/format';

// EXAMPLE 6: Setting restrictTimeToDay on TimePicker 

export default function Example6 (props) {

    const date = new Date(2003, 3, 23, 23, 45);
    const state = useDatePickerState(date); 
    const [selectedValue, setSelectedValue] = state;
  
    return (
        <>
        {format(selectedValue, 'MMMM d, y p')}
        <DatePicker state={state} />
        <TimePicker state={state} restrictTimeToDay={false}/>
        </>
    );
  }