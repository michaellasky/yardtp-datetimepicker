


# yardtp-datetimepicker - Yet Another React Datetime Picker

> yardtp-datetimepicker is a blazingly unbenchmarked Datetime Picker component for React 16.8+ focusing on simplicity and accessiblity. 

[![NPM](https://img.shields.io/npm/v/yardtp-datetimepicker.svg)](https://www.npmjs.com/package/yardtp-datetimepicker) 
[![SIZE](https://img.shields.io/bundlephobia/min/yardtp-datetimepicker.svg)](https://www.npmjs.com/package/yardtp-datetimepicker)

## Install

```bash
npm install --save yardtp-datetimepicker
```
## Dependencies
* [![Version](http://img.shields.io/npm/v/date-fns.svg?style=flat)](https://www.npmjs.com/package/date-fns) date-fns
* [![Version](http://img.shields.io/npm/v/react-jss.svg?style=flat)](https://www.npmjs.com/package/react-jss) react-jss

## Peer Dependencies
* [![npm version](http://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) React 16.8+ (hooks)

## Usage
[Go to Live Examples](https://michaellasky.github.io/yardtp-datetimepicker/)

```jsx
import React from 'react';
import { DatePicker, useDatePickerState } from 'yardtp-datetimepicker/';
import format from 'date-fns/format';

// EXAMPLE 1: DatePicker basic usage

export default function Example1 (props) {

    // useDatePickerState will default to today
    const state = useDatePickerState(); 
    // The output of useDatePickerState is an array with values and setFunctions for 
    // the currently selected day and the date for the calendar to display
    const [selectedValue, setSelectedValue, calendarValue, setCalendarValue] = state;

    return (
        <>
        {format(selectedValue, 'MMMM d, y')} - {format(calendarValue, 'MMMM d, y')}
        <DatePicker state={state} />
        </>
    );
}
```

## Options

### DateTimePicker 
| Name              | Default    |  |
| ----------------- |:----------:| -
| state             |            | This is an array containing: [selected datetime, set selected datetime function, calendar display datetime, set calendar display datetime function. ]  You can create this via the helper function useDatePickerState, or by spreading two useState calls ([...useState(selectedDateTime), ....useState(calendarDateTime)]).  State is passed through to both DatePicker and TimePicker, and is therefor common to both.
     
The props listed below can be passed to DateTimePicker and will be passed through to  DatePicker and TimePicker.

### DatePicker
| Name              | Default    |  |
| ----------------- |:----------:| -
| earliestDate      | 01/01/0001 | The earliest selectable datetime. Expects a vanilla Javascript Date object.
| latestDate        | 12/31/9999 | The latest selectable datetime. Expects a vanilla Javascript Date object.
| monthFormat      | "MMMM"      | Format that gets passed to date-fns format function when displaying the month.  See: [Unicode Date Field Symbol Table](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
| yearFormat       | "yyyy"      | Format that gets passed to date-fns format function when displaying the year.  See: [Unicode Date Field Symbol Table](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)

### TimePicker
| Name              | Default |  |
| ----------------- |:-------:| -
| restrictTimeToDay | true    | If true, the Selected Calendar Day won't advance to  next day when the time selected increases past 12:00am, nor retreat to the previous day when selected time decreases before 12:00am. 
| intervalStep      | 15      | Number of minutes to advance or retreat the selected time. 
| format    	    | "p"     | Format that gets passed to date-fns format function when displaying the time.  See: [Unicode Date Field Symbol Table](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)

## Styling
See: [https://nuclearhorsestudios.github.io/yardtp-datetimepicker/#styling](https://nuclearhorsestudios.github.io/yardtp-datetimepicker/#styling)

## License

MIT © [Michael Lasky](https://github.com/NuclearHorseStudios)
