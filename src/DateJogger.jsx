import React from 'react';
import { useDatePickerState } from './DateTimePicker';
import addMinutes from 'date-fns/addMinutes';
import addMonths from 'date-fns/addMonths';
import getMonth from 'date-fns/getMonth'
import getMinutes from 'date-fns/getMinutes';

export default function DateJogger (props) {
    const [value, setValue] = props.state         || useDatePickerState();
    const classes           = props.classes       || {};
    const interval          = props.intervalStep  || 15;
    const unit              = props.timeUnit      || 'minute';

    function jog(reverse = false) {
        const num = reverse? -interval: interval;
        
        if (unit.match(/^minute[s]*/)) { 
            setValue(addMinutes(value, num - (getMinutes(value) % interval))); 
        } 
        else if (unit.match(/^month[s]*/))  { 
            setValue(addMonths(value, num - ((getMonth(value)+1) % interval)));  
        }
    }

    return (
        <div className={classes.container}>
            <label name="decrement">
                <span className={classes.srOnly}>{props.decreaseLabel}</span>
                <button className={classes.button} onClick={() => jog(true)} >
                    &lt;
                </button>
            </label>
            {props.children}
            <label name="increment">
                <span className={classes.srOnly}>{props.increaseLabel}</span>
                <button className={classes.button} onClick={() => jog(false)}>
                    &gt;
                </button>
            </label>
        </div>
    );
}
