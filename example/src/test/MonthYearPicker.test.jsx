import React from 'react';
import { MonthYearPicker } from 'yardtp-datetimepicker';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { DateTime, Duration } from 'luxon';

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
        const fmt = 'M Y';
        mountComponent({monthFormat: 'M', yearFormat: 'Y'  });
        expect(wrapper.find('h3').text())
            .toBe(DateTime.local().toFormat(fmt));
    });

    it('Has a button which sets the month back by one', () => {
        const format = 'M YYYY';

        mountComponent({monthFormat: 'M', yearFormat: 'YYYY'  });

        const buttonWrapper = wrapper.find('label[name="decrement"] > button');
        
        expect(buttonWrapper.exists()).toBe(true);

        buttonWrapper.simulate('click');

        const prevMonth = DateTime.local().minus(Duration.fromObject({'month': 1}));
        expect(wrapper.find('h3').text()).toBe(prevMonth.toFormat(format))
    });

    it('Has a button which sets the month forward by one', () => {
        const format = 'M YYYY';

        mountComponent({monthFormat: 'M', yearFormat: 'YYYY' });

        const buttonWrapper = wrapper.find('label[name="increment"] > button');
        
        expect(buttonWrapper.exists()).toBe(true);

        buttonWrapper.simulate('click');

        const nextMonth = DateTime.local().plus(Duration.fromObject({'month': 1}));
        expect(wrapper.find('h3').text()).toBe(nextMonth.toFormat(format))
    });
});