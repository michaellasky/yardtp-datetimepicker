import React from 'react';
import { DatePicker, TimePicker, useDatePickerState } from 'yardtp-datetimepicker';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

// EXAMPLE 5: Setting the Selected Value dynamically

export default function Example5 (props) {

    const state = useDatePickerState(); 
    const [selectedValue, setSelectedValue] = state;
  
    function selectNextDay (e) {
        setSelectedValue(addDays(selectedValue, 1));
    }

    return (
        <>
        <button onClick={selectNextDay}>Select next day</button>
        &nbsp;&nbsp;
        {format(selectedValue, 'fff')}
        <DatePicker state={state} />
        <TimePicker state={state} />
        </>
    );
  }