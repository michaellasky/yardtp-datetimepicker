import React from 'react';
import { DateJogger } from 'yardtp-datetimepicker';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import addMinutes from 'date-fns/addMinutes';
import addMonths from 'date-fns/addMonths';
import subMinutes from 'date-fns/subMinutes';
import subMonths from 'date-fns/subMonths';

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

        const value = new Date(2003, 1, 3, 12, 15);
        let setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 15, 
            timeUnit: 'minute'
        });

        wrapper.find('label[name="increment"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(addMinutes(value, 15));

        setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 3, 
            timeUnit: 'month'
        });

        wrapper.find('label[name="increment"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        // only 1 month because were between intervalSteps
        // so it goes up to May, then floors nearest intervalStep March
        expect(setValue.mock.calls[0][0]).toEqual(addMonths(value, 1));

        setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 5, 
            timeUnit: 'month'
        });

        wrapper.find('label[name="increment"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        // 3 because were between intervalSteps
        // so it goes up July, then floors the value to nearest intervalStep May
        expect(setValue.mock.calls[0][0]).toEqual(addMonths(value, 3));

    });

    it('Decreases time properly with various intervalSteps and timeUnits', () => {

        const value = new Date(2003, 1, 3, 12, 15);
        let setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 15, 
            timeUnit: 'minute'
        });

        wrapper.find('label[name="decrement"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(subMinutes(value, 15));

        setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 3, 
            timeUnit: 'month'
        });

        wrapper.find('label[name="decrement"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        // 5 because we land between interval steps.
        // Starts at Feb, goes down 3 months to Nov. Floors to nearest intervalStep Sep
        expect(setValue.mock.calls[0][0]).toEqual(subMonths(value, 5));


        setValue = jest.fn();
        mountComponent({
            state: [value, setValue],
            intervalStep: 5, 
            timeUnit: 'month'
        });

        wrapper.find('label[name="decrement"] > button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(subMonths(value, 7));
    });
});