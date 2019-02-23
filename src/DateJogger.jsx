import React from 'react';
import { useDatePickerState } from './DateTimePicker';
import addMinutes from 'date-fns/addMinutes';
import addMonths from 'date-fns/addMonths';
import getMonth from 'date-fns/getMonth'
import getMinutes from 'date-fns/getMinutes';

export default function DateJogger ({
    state         = useDatePickerState(),
    classes       = {},
    intervalStep  = 15,
    timeUnit      = 'minute',
    increaseLabel = "Increase Label",
    decreaseLabel = "Decrease Label",
    children
}) {
    const [value, setValue] = state;

    function jog(reverse = false) {
        const num = reverse? -intervalStep: intervalStep;
        
        if (timeUnit.match(/^minute[s]*/)) { 
            setValue(addMinutes(value, num - (getMinutes(value) % intervalStep))); 
        } 
        else if (timeUnit.match(/^month[s]*/))  { 
            setValue(addMonths(value, num - ((getMonth(value)+1) % intervalStep)));  
        }
    }

    return (
        <div className={classes.container}>
            <label name="decrement">
                <span className={classes.srOnly}>{decreaseLabel}</span>
                <button className={classes.button} onClick={() => jog(true)} >
                    &lt;
                </button>
            </label>
            {children}
            <label name="increment">
                <span className={classes.srOnly}>{increaseLabel}</span>
                <button className={classes.button} onClick={() => jog(false)}>
                    &gt;
                </button>
            </label>
        </div>
    );
}
