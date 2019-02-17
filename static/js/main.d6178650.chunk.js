(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(6),c=a.n(r),s=(a(5),a(1)),i=a(3),m=a(2);function o(e){var t=Object(s.d)(),a=Object(i.a)(t,4),n=a[0],r=(a[1],a[2]);a[3];return l.a.createElement(l.a.Fragment,null,n.toFormat("DD")," - ",r.toFormat("DD"),l.a.createElement(s.a,{state:t}))}function u(e){var t=Object(s.d)(),a=Object(i.a)(t,2),n=a[0];a[1];return l.a.createElement(l.a.Fragment,null,n.toFormat("t"),l.a.createElement(s.b,{state:t}))}function d(e){var t=Object(s.d)(),a=Object(i.a)(t,2),n=a[0];a[1];return l.a.createElement(l.a.Fragment,null,n.toFormat("fff"),l.a.createElement(s.a,{state:t}),l.a.createElement(s.b,{state:t}),"or",l.a.createElement(s.c,{state:t}))}function p(e){var t=m.DateTime.local(1985,10,26,1,21),a=m.DateTime.local(1985,10,23,1,21),n=m.DateTime.local(1985,10,29,1,21),r=Object(s.d)(t),c=Object(i.a)(r,2),o=c[0],u=(c[1],{state:r,earliestDate:a,latestDate:n});return l.a.createElement(l.a.Fragment,null,o.toFormat("fff"),l.a.createElement(s.a,u),l.a.createElement(s.b,u))}function E(e){var t=Object(s.d)(),a=Object(i.a)(t,2),n=a[0],r=a[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement("button",{onClick:function(e){var t=m.Duration.fromObject({days:1});r(n.plus(t))}},"Select next day"),"\xa0\xa0",n.toFormat("fff"),l.a.createElement(s.a,{state:t}),l.a.createElement(s.b,{state:t}))}function f(e){var t=m.DateTime.local(2003,4,23,23,45),a=Object(s.d)(t),n=Object(i.a)(a,2),r=n[0];n[1];return l.a.createElement(l.a.Fragment,null,r.toFormat("fff"),l.a.createElement(s.a,{state:a}),l.a.createElement(s.b,{state:a,restrictTimeToDay:!1}))}function h(e){var t=m.DateTime.local(2003,4,23,23,45),a=Object(s.d)(t),n=Object(i.a)(a,2),r=n[0];n[1];return l.a.createElement(l.a.Fragment,null,r.toFormat("fff"),l.a.createElement(s.a,{state:a}),l.a.createElement(s.b,{state:a,restrictTimeToDay:!0}))}a(14);c.a.render(l.a.createElement(function(e){return l.a.createElement("div",{className:"examples"},l.a.createElement("h1",null,"yardtp-datetimepicker Examples"),l.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/yardtp-datetimepicker"},"github")," | ",l.a.createElement("a",{href:"https://www.npmjs.com/package/yardtp-datetimepicker"},"npm"),l.a.createElement("nav",null,l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("a",{href:"#basic-rendering"},"Basic Rendering")),l.a.createElement("li",null,l.a.createElement("a",{href:"#getting-selected-date"},"Getting selected date")),l.a.createElement("li",null,l.a.createElement("a",{href:"#restricting-selectable-dates"},"Restricting selectable dates")),l.a.createElement("li",null,l.a.createElement("a",{href:"#setting-selected-date-dynamically"},"Setting selected date dynamically")),l.a.createElement("li",null,l.a.createElement("a",{href:"#other-settings"},"Other Settings")),l.a.createElement("li",null,l.a.createElement("a",{href:"#styling"},"Styling")))),l.a.createElement("h2",{id:"basic-rendering"},"Basic Rendering"),l.a.createElement("h4",null,"DateTimePicker"),l.a.createElement("p",null,"The <DateTimePicker /> component is a simple wrapper for a <DatePicker /> followed immediately by a <TimePicker />.  Therefor you can apply any of the examples below to a <DateTimePicker />"),l.a.createElement("h4",null,"DatePicker"),l.a.createElement("p",null,"You can just render a DatePicker on its own, but that's not very useful."),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("div",{className:"example-container"},l.a.createElement("pre",null,"\n    <DatePicker />\n\n"),l.a.createElement("div",null,l.a.createElement(s.a,null))),l.a.createElement("h4",null,"TimePicker"),l.a.createElement("p",null,"Same for TimePicker, you can render it by itself, but it wont do anything."),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("div",{className:"example-container"},l.a.createElement("pre",null,"\n    <TimePicker />\n\n"),l.a.createElement("div",null,l.a.createElement(s.b,null))),l.a.createElement("h2",{id:"getting-selected-date"},"Getting selected datetime value"),l.a.createElement("h4",null,"DatePicker"),l.a.createElement("p",null,"Values are passed into and out of the components via state hooks."),l.a.createElement("p",null,"A convenience ",l.a.createElement("code",null,"useDatePickerState()")," function is provided for managing these state values.  It returns:"),l.a.createElement("ul",null,l.a.createElement("li",null,"The current selected date"),l.a.createElement("li",null,"Function for setting the current selected date"),l.a.createElement("li",null,"The current date displayed by the calendar"),l.a.createElement("li",null,"Function for setting the date displayed by the calendar")),l.a.createElement("p",null,"useDatePickerState(), when passed no arguments, will initialize both values to the current date and time."),l.a.createElement("div",{className:"example-container"},l.a.createElement("pre",null,"\n// See Example.1.jsx\nexport default function Example1 (props) {\n\n  const state = useDatePickerState(); \n  const [selectedValue, setSelectedValue, calendarValue, setCalendarValue] = state;\n\n  return (\n      <>\n      {selectedValue.toFormat('DD')} - {calendarValue.toFormat('DD')}\n      <DatePicker state={state} />\n      </>\n  );\n}\n          "),l.a.createElement("div",null,l.a.createElement(o,null))),l.a.createElement("h4",null,"TimePicker"),l.a.createElement("p",null,"Things are generally the same for the timepicker"),l.a.createElement("div",{className:"example-container"},l.a.createElement("pre",null,"\n// See Example.2.jsx\nexport default function Example2 (props) {\n\n  const state = useDatePickerState(); \n  const [selectedValue, setSelectedValue] = state;\n\n  return (\n      <>\n      {selectedValue.toFormat('t')}\n      <TimePicker state={state} />\n      </>\n  );\n}\n          "),l.a.createElement("div",null,l.a.createElement(u,null))),l.a.createElement("h4",null,"DatePicker and TimePicker together"),l.a.createElement("p",null,"Just pass the same selectedValue and setSelectedValue to both"),l.a.createElement("div",{className:"example-container"},l.a.createElement("pre",null,"\n// See Example.3.jsx\nexport default function Example3 (props) {\n\n  const state = useDatePickerState(); \n  const [selectedValue, setSelectedValue] = state;\n\n  return (\n      <>\n      {selectedValue.toFormat('fff')}\n      <DatePicker state={state} />\n      <TimePicker state={state} />\n\n      or\n\n      <DateTimePicker state={state} />\n      </>\n  );\n}\n          "),l.a.createElement("div",null,l.a.createElement(d,null))),l.a.createElement("h2",{id:"restricting-selectable-dates"},"Restricting selectable dates"),l.a.createElement("p",null,"Pass props.earliestDate or props.latestDate to restrict the selectable date range."),l.a.createElement("div",{className:"example-container"},l.a.createElement("pre",null,"\n// See Example.4.jsx\nexport default function Example4 (props) {\n\n  const today = DateTime.local(1985, 10, 26, 1, 21);\n  const earliestDate = DateTime.local(1985, 10, 23, 1, 21);\n  const latestDate = DateTime.local(1985, 10, 29, 1, 21);\n\n  const state = useDatePickerState(today); \n  const [selectedValue, setSelectedValue] = state;\n\n  const props = {\n      state,\n      earliestDate,\n      latestDate\n  }\n\n  return (\n      <>\n      {selectedValue.toFormat('fff')}\n      <DatePicker {...props} />\n      <TimePicker {...props} />\n      </>\n  );\n}\n          "),l.a.createElement("div",null,l.a.createElement(p,null))),l.a.createElement("h2",{id:"setting-selected-date-dynamically"},"Setting selected date dynamically"),l.a.createElement("p",null,"Simply call the setValue function returned from useDatePickerState"),l.a.createElement("div",{className:"example-container"},l.a.createElement("pre",null,"\n// See Example.5.jsx\nexport default function Example5 (props) {\n\n  const state = useDatePickerState(); \n  const [selectedValue, setSelectedValue] = state;\n\n  function selectNextDay (e) {\n      const oneDay = Duration.fromObject({days: 1});\n      setSelectedValue(selectedValue.plus(oneDay));\n  }\n\n  return (\n      <>\n      <button onClick={selectNextDay}>Select next day</button>\n      &nbsp;&nbsp;\n      {selectedValue.toFormat('fff')}\n      <DatePicker state={state} />\n      <TimePicker state={state} />\n      </>\n  );\n}\n\n          "),l.a.createElement("div",null,l.a.createElement(E,null))),l.a.createElement("h2",{id:"other-settings"},"Other Settings"),l.a.createElement("h4",null,"restrictTimeToDay"),l.a.createElement("p",null,"Passing restrictTimeToDay to TimePicker controls whether the selected value will increase or decrease to the next/previous day when jogging past 12:00am in either direction."),l.a.createElement("div",{className:"example-container"},l.a.createElement("pre",null,"\n// See Example.6.jsx\nexport default function Example6 (props) {\n\n  const date = DateTime.local(2003, 4, 23, 23, 45);\n  const state = useDatePickerState(date); \n  const [selectedValue, setSelectedValue] = state;\n\n  return (\n      <>\n      {selectedValue.toFormat('fff')}\n      <DatePicker state={state} />\n      <TimePicker state={state} restrictTimeToDay={false}/>\n      </>\n  );\n}\n          "),l.a.createElement("div",null,l.a.createElement(f,null))),l.a.createElement("div",{className:"example-container"},l.a.createElement("pre",null,"\n// See Example.7.jsx\nexport default function Example7 (props) {\n\n  const date = DateTime.local(2003, 4, 23, 23, 45);\n  const state = useDatePickerState(date); \n  const [selectedValue, setSelectedValue] = state;\n\n  return (\n      <>\n      {selectedValue.toFormat('fff')}\n      <DatePicker state={state} />\n      <TimePicker state={state} restrictTimeToDay={true}/>\n      </>\n  );\n}\n          "),l.a.createElement("div",null,l.a.createElement(h,null))),l.a.createElement("h2",{id:"styling"},"Styling"),l.a.createElement("h5",null,"See: yardtp-datetimepicker/example/src/yardtp-datetimepicker.scss"),l.a.createElement("p",null,"The scss is organized into 3 main files, all in yardtp-datetimepicker/src/scss/:"),l.a.createElement("dl",null,l.a.createElement("dt",null,"Variables.scss"),l.a.createElement("dd",null,"This file contains all the Variables used in the other two files. Override these variables for some quick and easy styling, overriding basic colors and some padding values."),l.a.createElement("dt",null,"Mixins.scss"),l.a.createElement("dd",null,"This file contains all the mixins that describe the more visual aspects of the styling.  Backgrounds, colors, fonts, etc.  Override these mixins for more control over the rendering."),l.a.createElement("dt",null,"Base.scss"),l.a.createElement("dd",null,'The primary css for the pickers.  Handles all the "structural" aspects the styling, css-grid values and what not. Applies mixins from Mixins.scss.')),l.a.createElement("h4",null,"Example"),l.a.createElement("p",null,"Below is an example of loading all 3 files, overriding options along the way"),l.a.createElement("pre",null,"\n@import '../node_modules/yardtp-datetimepicker/dist/scss/Variables.scss';\n\n// Example of overriding color variables \n// See Variables.scss for all variables\n// ---------------------------------\n$primaryColor: #ff0000;\n$secondaryColor: #00ff00;\n$disabledColor: #333333;\n\n\n@import '../node_modules/yardtp-datetimepicker/dist/scss/Mixins.scss';\n\n\n// Example of overriding a mixin \n// See Mixins.scss for all mixins\n// ---------------------------------\n\n@mixin time-display {\n    text-align: right;\n    font-size: 80%;\n    color: $primaryColor;\n}\n\n@import '../node_modules/yardtp-datetimepicker/dist/scss/Base.scss';\n"))},null),document.getElementById("root"))},5:function(e,t,a){},8:function(e,t,a){e.exports=a(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.d6178650.chunk.js.map