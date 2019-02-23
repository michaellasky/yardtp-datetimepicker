import React from 'react'

import { DatePicker, TimePicker } from 'yardtp-datetimepicker'

import Example1 from './examples/Example.1';
import Example2 from './examples/Example.2';
import Example3 from './examples/Example.3';
import Example4 from './examples/Example.4';
import Example5 from './examples/Example.5';
import Example6 from './examples/Example.6';
import Example7 from './examples/Example.7';
import Example8 from './examples/Example.8';

import './index.css';

export default function Examples (props) {
  
  return (
      <div className="examples">
        <h1>yardtp-datetimepicker Examples</h1>
        <h5>v2.0.2</h5>
        <a href="https://github.com/NuclearHorseStudios/yardtp-datetimepicker">github</a> | <a href="https://www.npmjs.com/package/yardtp-datetimepicker">npm</a> 
        <nav>
          <ul>
            <li><a href="#basic-rendering">Basic Rendering</a></li>
            <li><a href="#getting-selected-date">Getting selected date</a></li>
            <li><a href="#restricting-selectable-dates">Restricting selectable dates</a></li>
            <li><a href="#setting-selected-date-dynamically">Setting selected date dynamically</a></li>
            <li><a href="#other-settings">Other Settings</a></li>
            <li><a href="#styling">Styling</a></li>
          </ul>
        </nav>
        <h2 id="basic-rendering">Basic Rendering</h2>

        <h4>DateTimePicker</h4>
        <p>The &lt;DateTimePicker /&gt; component is a simple wrapper for a &lt;DatePicker /&gt; followed immediately by a &lt;TimePicker /&gt;.  Therefor you can apply any of the examples below to a &lt;DateTimePicker /&gt;</p>
        <h4>DatePicker</h4>
        <p>You can just render a DatePicker on its own, but that's not very useful.</p>
        <br /><br />
        <div className="example-container">
          <pre>{`\n    <DatePicker />\n\n`}</pre>
          <div>
            <DatePicker />  
          </div>        
        </div>

        <h4>TimePicker</h4>
        <p>Same for TimePicker, you can render it by itself, but it wont do anything.</p>
        <br /><br />
        <div className="example-container">
          <pre>{`\n    <TimePicker />\n\n`}</pre>
          <div>
            <TimePicker />
          </div>
        </div>

        <h2 id="getting-selected-date">Getting selected datetime value</h2>
        
        <h4>DatePicker</h4>
        <p>Values are passed into and out of the components via state hooks.</p>
        <p>
          A convenience <code>useDatePickerState()</code> function is provided for managing these state values.  It returns:
        </p>
        <ul>
          <li>The current selected date</li>
          <li>Function for setting the current selected date</li>
          <li>The current date displayed by the calendar</li>
          <li>Function for setting the date displayed by the calendar</li>
        </ul>
        <p>
          useDatePickerState(), when passed no arguments, will initialize both values to the current date and time.
        </p>
        
        <div className="example-container">
          <pre>{`
// EXAMPLE 1: DatePicker basic usage

export default function Example1 (props) {

    // useDatePickerState will default to today
    const state = useDatePickerState(); 
    const [selectedValue, setSelectedValue, calendarValue, setCalendarValue] = state;

    return (
        <>
        {format(selectedValue, 'MMMM d, y')} - {format(calendarValue, 'MMMM d, y')}
        <DatePicker state={state} />
        </>
    );
}
          `}</pre>
          <div>
            <Example1 />
          </div>
        </div>

        <h4>TimePicker</h4>
        <p>
          Things are generally the same for the timepicker, except TimePicker doesn't need the calendarValue and setCalendarValue functions.  No harm in passing them though.  
        </p>
        <div className="example-container">
          <pre>{`

// EXAMPLE 2: TimePicker basic usage

export default function Example2 (props) {

    const state = useDatePickerState(); 
  
    // We can ignore the calendarValue states while still using useDatePickerState();
    const [selectedValue, setSelectedValue] = state;
  
    return (
        <>
        {format(selectedValue, 'p')}
        <TimePicker state={state} />
        </>
    );
  }
          `}</pre>
          <div>
            <Example2 />
          </div>
        </div>


        <h4>DatePicker and TimePicker together</h4>
        <p>
          Just pass the same selectedValue and setSelectedValue to both  
        </p>
        <div className="example-container">
          <pre>{`
// EXAMPLE 3: Using DatePicker and TimePicker together

export default function Example3 (props) {

    const state = useDatePickerState(); 
  
    // We can ignore the calendarValue states while still using useDatePickerState();
    const [selectedValue, setSelectedValue] = state;
  
    return (
        <>
        {format(selectedValue, 'MMMM d, y p')}
        <DatePicker state={state} />
        <TimePicker state={state} />
        
        or

        <DateTimePicker state={state} />
        </>
    );
  }
          `}</pre>
          <div>
            <Example3 />
          </div>
        </div>

        <h2 id="restricting-selectable-dates">Restricting selectable dates</h2>
        <p>
          Pass props.earliestDate or props.latestDate to restrict the selectable date range.  
        </p>
        <div className="example-container">
          <pre>{`
// EXAMPLE 4: Restricting selectable dates

export default function Example4 (p) {

    const today = new Date(1985, 9, 26, 1, 21);
    const earliestDate = new Date(1985, 9, 23, 1, 21);
    const latestDate = new Date(1985, 9, 29, 1, 21);
  
    const state = useDatePickerState(today); 
    const [selectedValue, setSelectedValue] = state;
  
    const props = {
        state,
        earliestDate,
        latestDate
    }
  
    return (
        <>
        {format(selectedValue, 'MMMM d, y p')}
        <DatePicker {...props} />
        <TimePicker {...props} />
        </>
    );
  }
          `}</pre>
          <div>
            <Example4 />
          </div>
        </div>

        <h2 id="setting-selected-date-dynamically">Setting selected date dynamically</h2>
        <p>
          Simply call the setValue function returned from useDatePickerState  
        </p>
        <div className="example-container">
          <pre>{`

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
        {format(selectedValue, 'MMMM d, y p')}
        <DatePicker state={state} />
        <TimePicker state={state} />
        </>
    );
  }
          `}</pre>
          <div>
            <Example5 />
          </div>
        </div>

        <h2 id="other-settings">Other Settings</h2>
        <h4>restrictTimeToDay</h4>
        <p>
          Passing restrictTimeToDay to TimePicker controls whether the selected 
          value will increase or decrease to the next/previous day when jogging 
          past 12:00am in either direction.  
        </p>
        <div className="example-container">
          <pre>{`
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
          `}</pre>
          <div>
            <Example6 />
          </div>
        </div>
        <div className="example-container">
          <pre>{`
// EXAMPLE 7: Setting restrictTimeToDay on TimePicker 

export default function Example7 (props) {

    const date = new Date(2003, 3, 23, 23, 45);
    const state = useDatePickerState(date); 
    const [selectedValue, setSelectedValue] = state;
  
    return (
        <>
        {format(selectedValue, 'MMMM d, y p')}
        <DatePicker state={state} />
        <TimePicker state={state} restrictTimeToDay={true}/>
        </>
    );
  }
          `}</pre>
          <div>
            <Example7 />
          </div>
        </div>

        <h2 id="styling">Styling</h2>

        <p>Styling is handled by passing props.style an object to override default styles</p>
        <p>See /src/defaultStyles.js for all the default styles that can be overridden</p>
        <div className="example-container">
          <pre>{`
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
          `}</pre>
          <div>
            <Example8 />
          </div>

          <p>The Following can be overridden</p>
          <dl>
            <dt>calendarDay</dt>
            <dd>Applies to all days</dd>

            <dt>currentMonthDay</dt>
            <dd>Applies to days in the same month as the calendarValue state prop</dd>

            <dt>outOfRangeDay</dt>
            <dd>Applies to days that arent selectable because they're before props.earliestDate or after props.latestDate</dd>

            <dt>inRangeDay</dt>
            <dd>Applies to days that are selectable because they're after props.earliestDate and before props.latestDate</dd>

            <dt>previousMonthDay</dt>
            <dd>Applies to days in the month prior to the month passed as the 3rd value of the state prop </dd>

            <dt>nextMonthDay</dt>
            <dd>Applies to days in the month after to the month passed as the 3rd value of the state prop </dd>

            <dt>presentDay</dt>
            <dd>Applies to the day that matches DateTime.local()  (today)</dd>

            <dt>selectedDay</dt>
            <dd>Applies to the currently selected day, which passed as the first value of the state prop</dd>
          
            <dt>monthYearHeading</dt>
            <dd>Applies to the display of the month and year in the heading of the calendar.</dd>

            <dt>monthYearButton</dt>
            <dd>Applies to the increment and decrement month buttons</dd>

            <dt>timeDisplay</dt>
            <dd>Applies to the time shown in the TimePicker</dd>

            <dt>timeButton</dt>
            <dd>Applies to the increment and decrement time buttons in the TimePicker</dd>

            <dt>weekDayName</dt>
            <dd>Applies to the names of the week days above the calendar days.  Mon, Tues, Wed, etc</dd>
          </dl>
        </div>
      </div>
    );
}

