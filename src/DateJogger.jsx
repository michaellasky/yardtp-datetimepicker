import React from 'react';
import { Duration } from 'luxon';
import { useDatePickerState } from './DateTimePicker';

export default function DateJogger (props) {
    const [value, setValue] = props.state         || useDatePickerState();
    const classes           = props.classes       || {};
    const interval          = props.intervalStep  || 15;
    const timeUnit          = props.timeUnit      || 'minute';

    function jog(reverse = false) {
        const num = reverse? -interval: interval;
        const delta = num - ((~~(value[timeUnit]) % interval));

        setValue(value.plus(Duration.fromObject({[`${timeUnit}s`]: delta})));
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
