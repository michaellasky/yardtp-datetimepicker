import React from 'react';
import { DateJogger } from 'yardtp-datetimepicker';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import { DateTime, Duration } from 'luxon';

let wrapper;
        
Enzyme.configure({ adapter: new Adapter() });

describe('<DateJogger />', () => {
    beforeEach(() => {});

    afterEach(() => {
        if (wrapper !== null) { wrapper.unmount()}
        wrapper = null;
    });

    function mountComponent(props) {
        wrapper = shallow(<DateJogger {...props} />);
    } 

    it ('Renders without crashing', () => {
        mountComponent();
    });

    it('Increases time properly with various intervalSteps and timeUnits', () => {

        const value = DateTime.local(2003, 2, 3, 12, 15);
        let setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 15, 
            timeUnit: 'minute'
        });

        wrapper.find('label[name="increment"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(value.plus(Duration.fromObject({
            minutes: 15
        })));

        setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 3, 
            timeUnit: 'month'
        });

        wrapper.find('label[name="increment"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(value.plus(Duration.fromObject({
            months: 1 // only 1 month because were between intervalSteps
                      // so it goes up 3, then floors the value to nearest
                      // step 2 + 3 = 5, nearest lower step is 3, so + 1
        })));


        setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 5, 
            timeUnit: 'year'
        });

        wrapper.find('label[name="increment"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(value.plus(Duration.fromObject({
            years: 2 // 5 years because were between intervalSteps
                     // so it goes up 5, but then floors the value to nearest
                     // step
        })));
    });

    it('Decreases time properly with various intervalSteps and timeUnits', () => {

        const value = DateTime.local(2003, 2, 3, 12, 15);
        let setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 15, 
            timeUnit: 'minute'
        });

        wrapper.find('label[name="decrement"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(value.minus(Duration.fromObject({
            minutes: 15
        })));

        setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 3, 
            timeUnit: 'month'
        });

        wrapper.find('label[name="decrement"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(value.plus(Duration.fromObject({
            months: -5 // -5 months because were between intervalSteps
                       // so it goes down 3, then floors the value to nearest
                       // step
        })));


        setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 5, 
            timeUnit: 'year'
        });

        wrapper.find('label[name="decrement"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(value.plus(Duration.fromObject({
            years: -8 // -8 years because were between intervalSteps
                      // so it goes down 5, then floors the value to nearest
                      // step
        })));
    });
});