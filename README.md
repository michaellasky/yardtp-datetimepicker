
# yardtp-datetimepicker - Yet Another React Datetime Picker

> yardtp-datetimepicker is a Datetime Picker component for React 16.8+ focusing on simplicity and accessiblity. 

[![NPM](https://img.shields.io/npm/v/yardtp-datetimepicker.svg)](https://www.npmjs.com/package/yardtp-datetimepicker) 

## Install

```bash
npm install --save yardtp-datetimepicker
```
## Usage
[Go to Live Examples](https://nuclearhorsestudios.github.io/yardtp-datetimepicker/)

```jsx
import React from 'react'
import DateTime from 'luxon';
import DatePicker, { TimePicker, useDatePickerState } from 'yardtp-datetimepicker'

export default Example  {

  const state = useDatePickerState(); 
  const [value, setValue, calValue, setCalValue] = state;

  return (
    <>
      Currently selected value: {value.toFormat('ffff')}
      <DatePicker state={state}/>
      <TimePicker state={state}/>
    </>
  );
}
```

## Options
### DatePicker
| Name              | Default    |                                                |
| ----------------- |:----------:| ---------------------------------------------- |
| earliestDate      | 01/01/0001 | The earliest selectable datetime. Expects a luxon DateTime object. 
| latestDate        | 12/31/9999 | The latest selectable datetime. Expects a luxon DateTime object.
| monthFormat      | "MMMM"      | Format that gets passed to luxon's toFormat method when displaying the month.  See: [Luxon Table of Tokens](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens)
| yearFormat       | "yyyy"      | Format that gets passed to luxon's toFormat method when displaying the year.  See: [Luxon Table of Tokens](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens)

### TimePicker
| Name              | Default |                                                  |
| ----------------- |:-------:| ------------------------------------------------ |
| restrictTimeToDay | true    | If true, the Selected Calendar Day won't advance to  next day when the time selected increases past 12:00am, nor retreat to the previous day when selected time decreases before 12:00am. 
| intervalStep      | 15      | Number of minutes to advance or retreat the selected time. 
| format    	    | "t"     | Format that gets passed to luxon's toFormat method when displaying the time.  See: [Luxon Table of Tokens](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens)

## Peer Dependencies
* React 16.8+ (hooks) [![npm version](http://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)
* Luxon [![Version](http://img.shields.io/npm/v/luxon.svg?style=flat)](https://npmjs.org/package/luxon)
* Classnames [![Version](http://img.shields.io/npm/v/classnames.svg?style=flat)](https://www.npmjs.org/package/classnames)

## License

MIT © [Michael Lasky](https://github.com/NuclearHorseStudios)
