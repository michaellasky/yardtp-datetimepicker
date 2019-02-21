import React from 'react';
import { MonthYearPicker } from 'yardtp-datetimepicker';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import format from 'date-fns/format';
import subMonths from 'date-fns/subMonths';
import addMonths from 'date-fns/addMonths';

let wrapper;
        
Enzyme.configure({ adapter: new Adapter() });

describe('<MonthYearPicker />', () => {

    beforeEach(() => {});

    afterEach(() => {
        if (wrapper !== null) { wrapper.unmount()}
        wrapper = null;
    });

    function mountComponent(props) {
        wrapper = mount(<MonthYearPicker {...props} />);
    } 

    it ('Renders without crashing', () => {
        mountComponent();
    });

    it('Sets current month and year when props.value isnt passed', () => {
        const fmt = 'L y';
        mountComponent({monthFormat: 'L', yearFormat: 'y'  });
        expect(wrapper.find('h3').text()).toBe(format(new Date(), fmt));
    });

    it('Has a button which sets the month back by one', () => {
        const fmt = 'LLLL yyyy';

        mountComponent({monthFormat: 'LLLL', yearFormat: 'yyyy'  });

        const buttonWrapper = wrapper.find('label[name="decrement"] > button');
        
        expect(buttonWrapper.exists()).toBe(true);

        buttonWrapper.simulate('click');

        const prevMonth = subMonths(new Date(), 1);
        expect(wrapper.find('h3').text()).toBe(format(prevMonth, fmt));
    });

    it('Has a button which sets the month forward by one', () => {
        const fmt = 'L yyyy';

        mountComponent({monthFormat: 'L', yearFormat: 'yyyy' });

        const buttonWrapper = wrapper.find('label[name="increment"] > button');
        
        expect(buttonWrapper.exists()).toBe(true);

        buttonWrapper.simulate('click');

        const nextMonth = addMonths(new Date(), 1);
        expect(wrapper.find('h3').text()).toBe(format(nextMonth, fmt));
    });
});