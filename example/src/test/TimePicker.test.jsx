import React from 'react';
import { TimePicker } from 'yardtp-datetimepicker';
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

    it('Calls props.setValue with value + intervalStep minutes when clicking increase-time-button', () => {

        const setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            state: [
                DateTime.local(2015, 12, 15, 12, 15),
                setValue,
                DateTime.local(2015, 12, 15, 12, 15),
                jest.fn()
            ]
        });

        wrapper.find('button.increase-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 15, 12, 30));
        
    });

    it('Calls props.setValue with value - intervalStep minutes when clicking decrease-time-button', () => {

        const setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            state: [
                DateTime.local(2015, 12, 15, 12, 15),
                setValue,
                DateTime.local(2015, 12, 15, 12, 15),
                jest.fn()
            ],
        });
        
        wrapper.find('button.decrease-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 15, 12));
        
    });

    it('Cycles within the same day when props.restrictToDay is true', () => {
        let setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            state: [
                DateTime.local(2015, 12, 15, 23, 45),
                setValue,
                DateTime.local(2015, 12, 15, 23, 45),
                jest.fn()
            ],
            restrictTimeToDay: true
        });

        wrapper.find('button.increase-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 15, 0));
        
        setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            state: [
                DateTime.local(2015, 12, 15),
                setValue,
                DateTime.local(2015, 12, 15),
                jest.fn()
            ],
            restrictTimeToDay: true
        });

        wrapper.find('button.decrease-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 15, 23, 45));
        
        setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            state: [
                DateTime.local(2015, 12, 15, 23, 45),
                setValue,
                DateTime.local(2015, 12, 15, 23, 45),
                jest.fn()
            ],
            restrictTimeToDay: false
        });

        wrapper.find('button.increase-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 16));


        setValue = jest.fn();
        mountComponent({
            intervalStep: 15,
            state: [
                DateTime.local(2015, 12, 15),
                setValue,
                DateTime.local(2015, 12, 15),
                jest.fn()
            ],
            restrictTimeToDay: false
        });

        wrapper.find('button.decrease-time-button').simulate('click');

        expect(setValue.mock.calls.length).toBe(1);
        expect(setValue.mock.calls[0][0]).toEqual(DateTime.local(2015, 12, 14, 23, 45));
        
    });
});