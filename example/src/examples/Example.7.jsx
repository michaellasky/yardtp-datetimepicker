import React from 'react';
import DatePicker, { TimePicker, useDatePickerState } from 'yardtp-datetimepicker';
import { DateTime } from 'luxon';

// EXAMPLE 7: Setting restrictTimeToDay on TimePicker 

export default function Example7 (props) {

    const date = DateTime.local(2003, 4, 23, 23, 45);
    const state = useDatePickerState(date); 
    const [selectedValue, setSelectedValue] = state;
  
    return (
        <>
        {selectedValue.toFormat('fff')}
        <DatePicker state={state} />
        <TimePicker state={state} restrictTimeToDay={true}/>
        </>
    );
  }