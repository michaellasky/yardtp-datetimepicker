import React from 'react';
import DatePicker, { TimePicker, useDatePickerState } from 'yardtp-datetimepicker';
import { Duration } from 'luxon';

// EXAMPLE 5: Setting the Selected Value dynamically

export default function Example5 (props) {

    const state = useDatePickerState(); 
    const [selectedValue, setSelectedValue] = state;
  
    function selectNextDay (e) {
        const oneDay = Duration.fromObject({days: 1});
        setSelectedValue(selectedValue.plus(oneDay));
    }

    return (
        <>
        <button onClick={selectNextDay}>Select next day</button>
        &nbsp;&nbsp;
        {selectedValue.toFormat('fff')}
        <DatePicker state={state} />
        <TimePicker state={state} />
        </>
    );
  }