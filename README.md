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

## License

MIT © [Michael Lasky](https://github.com/NuclearHorseStudios)
