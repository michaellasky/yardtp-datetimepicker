import React from 'react'

import DatePicker, { TimePicker } from 'yardtp-datetimepicker'

import Example1 from './Example.1';
import Example2 from './Example.2';
import Example3 from './Example.3';
import Example4 from './Example.4';
import Example5 from './Example.5';
import Example6 from './Example.6';
import Example7 from './Example.7';

import './yardtp-datetimepicker.scss';

import './index.css';

export default function Examples (props) {
  
  return (
      <div className="examples">
        <h1>yardtp-datetimepicker Examples</h1>
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
// See Example.1.jsx
export default function Example1 (props) {

  const state = useDatePickerState(); 
  const [selectedValue, setSelectedValue, calendarValue, setCalendarValue] = state;

  return (
      <>
      {selectedValue.toFormat('DD')} - {calendarValue.toFormat('DD')}
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
          Things are generally the same for the timepicker  
        </p>
        <div className="example-container">
          <pre>{`
// See Example.2.jsx
export default function Example2 (props) {

  const state = useDatePickerState(); 
  const [selectedValue, setSelectedValue] = state;

  return (
      <>
      {selectedValue.toFormat('t')}
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
// See Example.3.jsx
export default function Example3 (props) {

  const state = useDatePickerState(); 
  const [selectedValue, setSelectedValue] = state;

  return (
      <>
      {selectedValue.toFormat('fff')}
      <DatePicker state={state} />
      <TimePicker state={state} />
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
// See Example.4.jsx
export default function Example4 (props) {

  const today = DateTime.local(1985, 10, 26, 1, 21);
  const earliestDate = DateTime.local(1985, 10, 23, 1, 21);
  const latestDate = DateTime.local(1985, 10, 29, 1, 21);

  const state = useDatePickerState(today); 
  const [selectedValue, setSelectedValue] = state;

  const props = {
      state,
      earliestDate,
      latestDate
  }

  return (
      <>
      {selectedValue.toFormat('fff')}
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
// See Example.5.jsx
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
// See Example.6.jsx
export default function Example6 (props) {

  const date = DateTime.local(2003, 4, 23, 23, 45);
  const state = useDatePickerState(date); 
  const [selectedValue, setSelectedValue] = state;

  return (
      <>
      {selectedValue.toFormat('fff')}
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
// See Example.7.jsx
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
          `}</pre>
          <div>
            <Example7 />
          </div>
        </div>

        <h2 id="styling">Styling</h2>

        <h5>See: yardtp-datetimepicker/example/src/yardtp-datetimepicker.scss</h5>
        <p>
          The scss is organized into 3 main files, all in yardtp-datetimepicker/src/scss/:
        </p>
        <dl>

        <dt>Variables.scss</dt>
          <dd>This file contains all the Variables used in the other two files.
              Override these variables for some quick and easy styling, overriding 
              basic colors and some padding values.
          </dd>
          
          <dt>Mixins.scss</dt>
          <dd>This file contains all the mixins that describe the more visual 
              aspects of the styling.  Backgrounds, colors, fonts, etc.  Override 
              these mixins for more control over the rendering.
          </dd>

          <dt>Base.scss</dt>
          <dd>The primary css for the pickers.  Handles all the "structural" aspects 
              the styling, css-grid values and what not. Applies mixins from
              Mixins.scss.  
          </dd>
        </dl>

        <h4>Example</h4>
        <p>Below is an example of loading all 3 files, overriding options along the way</p>
        <pre>
{`
@import '../node_modules/yardtp-datetimepicker/src/scss/Variables.scss';

// Example of overriding color variables 
// See Variables.scss for all variables
// ---------------------------------
$primaryColor: #ff0000;
$secondaryColor: #00ff00;
$disabledColor: #333333;


@import '../node_modules/yardtp-datetimepicker/src/scss/Mixins.scss';


// Example of overriding a mixin 
// See Mixins.scss for all mixins
// ---------------------------------

@mixin time-display {
    text-align: right;
    font-size: 80%;
    color: $primaryColor;
}

@import '../node_modules/yardtp-datetimepicker/src/scss/Base.scss';
`}
        </pre>
      </div>
    );
}

