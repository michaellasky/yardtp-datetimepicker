import React from 'react';
import TimePicker from './TimePicker';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { DateTime, Duration } from 'luxon';

let wrapper;
        
Enzyme.configure({ adapter: new Adapter() });

describe('<TimePicker />', () => {
    beforeEach(() => {});

    afterEach(() => {
        if (wrapper !== null) { wrapper.unmount()}
        wrapper = null;
    });

    function mountComponent(props) {
        wrapper = mount(<TimePicker {...props} />);
    } 

    it ('Renders without crashing', () => {
        mountComponent();
    });

    it ('Sets the value passed in to last intervalStep', () => {

        const setValue = jest.fn();

        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15, 12, 14),
            setValue,
            format: DateTime.TIME_SIMPLE
        });

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 15, 12, 15));
        
        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15, 12, 13),
            setValue,
            format: DateTime.TIME_SIMPLE
        });

        expect(setValue.mock.calls.length).toBe(2);
        expect(setValue.mock.calls[1][0]).toEqual(DateTime.local(2015, 12, 15, 12, 15));
        
        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15, 12, 19),
            setValue,
            format: DateTime.TIME_SIMPLE
        });

        expect(setValue.mock.calls.length).toBe(3);
        expect(setValue.mock.calls[2][0]).toEqual(DateTime.local(2015, 12, 15, 12, 30));
        
        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15, 12, 7),
            setValue,
            format: DateTime.TIME_SIMPLE
        });
    
        expect(setValue.mock.calls.length).toBe(4);
        expect(setValue.mock.calls[3][0]).toEqual(DateTime.local(2015, 12, 15, 12, 15));
        
        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15, 12, 5),
            setValue,
            format: DateTime.TIME_SIMPLE
        });
    
        expect(setValue.mock.calls.length).toBe(5);
        expect(setValue.mock.calls[4][0]).toEqual(DateTime.local(2015, 12, 15, 12, 15));
    });

    it('Calls props.setValue with value + intervalStep minutes when clicking increase-time-button', () => {

        const setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15, 12, 15),
            setValue
        });

        wrapper.find('button.increase-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 15, 12, 30));
        
    });

    it('Calls props.setValue with value - intervalStep minutes when clicking decrease-time-button', () => {

        const setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15, 12, 15),
            setValue
        });
        
        wrapper.find('button.decrease-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 15, 12));
        
    });

    it('Cycles within the same day when props.restrictToDay is true', () => {
        let setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15, 23, 45),
            setValue,
            restrictTimeToDay: true
        });

        wrapper.find('button.increase-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 15, 0));
        
        setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15),
            setValue,
            restrictTimeToDay: true
        });

        wrapper.find('button.decrease-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 15, 23, 45));
        
        setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15, 23, 45),
            setValue,
            restrictTimeToDay: false
        });

        wrapper.find('button.increase-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 16));


        setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            value: DateTime.local(2015, 12, 15),
            setValue,
            restrictTimeToDay: false
        });

        wrapper.find('button.decrease-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 14, 23, 45));
        
    });
});