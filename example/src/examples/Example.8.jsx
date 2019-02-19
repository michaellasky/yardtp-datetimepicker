import React from 'react';
import DateTimePicker from 'yardtp-datetimepicker';

// EXAMPLE 8: Custom Styling 

export default function Example8 (props) {

    const hotDogStandStyle = {
        selectedDay: {
            backgroundColor: "#ffff55",
            color: "#ff0000",
        },
        currentMonthDay: {
            backgroundColor: "#ff0000",
            color: "#ffff00",
            borderRadius: "1em"
        }
    } 
    return (
        <>
        <DateTimePicker style={hotDogStandStyle} />
        </>
    );
  }