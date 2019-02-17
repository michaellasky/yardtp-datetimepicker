import React from 'react';
import { DatePicker, MonthYearPicker, CalendarDay } from 'yardtp-datetimepicker';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { DateTime, Duration } from 'luxon';

let wrapper;
        
Enzyme.configure({ adapter: new Adapter() });

const now = DateTime.local(1985, 10, 26, 1, 21);
const yesterday = now.minus(Duration.fromObject({'days': 1}));
const tomorrow = now.plus(Duration.fromObject({'days': 1}));
const lastMonth = now.minus(Duration.fromObject({'months': 1}));
const nextMonth = now.plus(Duration.fromObject({'months': 1}));

describe('<DatePicker />', () => {

    beforeEach(() => {});

    afterEach(() => {
        if (wrapper !== null) { wrapper.unmount()}
        wrapper = null;
    });

    function mountComponent(props) {
        wrapper = mount(<DatePicker {...props} />);
    } 

    it('Renders without crashing', () => {
        mountComponent();
    });
   
});

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
        const yearFormat = 'M Y';
        mountComponent({monthFormat: 'M', yearFormat: 'Y'  });
        expect(wrapper.find('h3.month-year').text())
            .toBe(DateTime.local().toFormat(yearFormat));
    });

    it('Has a button.prev-month-button which sets the month back by one', () => {
        const format = 'M YYYY';

        mountComponent({monthFormat: 'M', yearFormat: 'YYYY'  });

        const buttonWrapper = wrapper.find('button.prev-month-button');
        
        expect(buttonWrapper.exists()).toBe(true);

        buttonWrapper.simulate('click');

        const prevMonth = DateTime.local().minus(Duration.fromObject({'month': 1}));
        expect(wrapper.find('h3.month-year').text()).toBe(prevMonth.toFormat(format))
    });

    it('Has a button.next-month-button which sets the month back by one', () => {
        const format = 'M YYYY';

        mountComponent({monthFormat: 'M', yearFormat: 'YYYY' });

        const buttonWrapper = wrapper.find('button.next-month-button');
        
        expect(buttonWrapper.exists()).toBe(true);

        buttonWrapper.simulate('click');

        const nextMonth = DateTime.local().plus(Duration.fromObject({'month': 1}));
        expect(wrapper.find('h3.month-year').text()).toBe(nextMonth.toFormat(format))
    });
});

describe('<CalendarDay />', () => {

    beforeEach(() => {});

    afterEach(() => {
        if (wrapper !== null) { wrapper.unmount()}
        wrapper = null;
    });

    function mountComponent(props) {
        wrapper = mount(<CalendarDay {...props} />);
    } 

    it ('Renders without crashing', () => {
        mountComponent();
    });

    it('Sets the displayed day equal to props.value', () => {

        mountComponent({ value: now, selectedValue: yesterday});

        expect(wrapper.find('label').text()).toBe(now.day.toString());
    });

    it('Calls props.setSelectedValue with props.value when clicked', () => {

        const setSelVal = jest.fn();
        mountComponent({
            value: now, 
            state: [yesterday,setSelVal]
        });

        expect(setSelVal.mock.calls.length).toBe(0);

        wrapper.find('input').simulate('change');
        
        expect(setSelVal.mock.calls.length).toBe(1);
        expect(setSelVal.mock.calls[0][0]).toEqual(now);
    });

    it('Adds .selectable to values within the selectable range', () => {
        mountComponent({
            value: now, 
            latestDate: tomorrow,
            earliestDate: yesterday 
        });

        expect(wrapper.find('label.selectable').exists()).toBe(true);

        mountComponent({
            value: tomorrow,  
            latestDate: now,
            earliestDate: yesterday 
        });

        expect(wrapper.find('label.selectable').exists()).toBe(false);

        mountComponent({
            value: now,  
            latestDate: yesterday,
            earliestDate: yesterday 
        });

        expect(wrapper.find('label.selectable').exists()).toBe(false);
    });

    it('Adds .out-of-range to values outside the selectable range', () => {
        mountComponent({
            value: tomorrow,  
            latestDate: now,
            earliestDate: yesterday 
        });

        expect(wrapper.find('label.out-of-range').exists()).toBe(true);

        mountComponent({
            value: now,  
            latestDate: tomorrow,
            earliestDate: yesterday 
        });

        expect(wrapper.find('label.out-of-range').exists()).toBe(false);
    });

    it('Adds class .previous-month to label for days in the month prior to the calValue month', () => {
    
        mountComponent({calValue: now, value: lastMonth});
        expect(wrapper.find('label.previous-month').exists()).toBe(true);

        mountComponent({calValue: now, value: now});
        expect(wrapper.find('label.previous-month').exists()).toBe(false);

        mountComponent({calValue: now, value: nextMonth});
        expect(wrapper.find('label.previous-month').exists()).toBe(false);
    });

    it('Adds class .current-month to label for days within calValue month', () => {

        mountComponent({calValue: now, value: lastMonth });
        expect(wrapper.find('label.current-month').exists()).toBe(false);

        mountComponent({calValue: now, value: now });
        expect(wrapper.find('label.current-month').exists()).toBe(true);

        mountComponent({calValue: now, value: nextMonth });
        expect(wrapper.find('label.current-month').exists()).toBe(false);
    });

    it('Adds class .next-month to label for days in month after calValue month', () => {

        mountComponent({calValue: now, value: lastMonth });
        expect(wrapper.find('label.next-month').exists()).toBe(false);

        mountComponent({calValue: now, value: now });
        expect(wrapper.find('label.next-month').exists()).toBe(false);

        mountComponent({calValue: now, value: nextMonth });
        expect(wrapper.find('label.next-month').exists()).toBe(true);
    });

    it('Adds class .past to days in the past', () => {
        
        const oneDay = Duration.fromObject({days: 1});
        
        mountComponent({value: DateTime.local().minus(oneDay)});
        expect(wrapper.find('label.past').exists()).toBe(true);

        mountComponent({value: DateTime.local()});
        expect(wrapper.find('label.past').exists()).toBe(false);

        mountComponent({value: DateTime.local().plus(oneDay)});
        expect(wrapper.find('label.past').exists()).toBe(false);
    });

    it('Adds class .present to the current day', () => {

        const oneDay = Duration.fromObject({days: 1});
        
        mountComponent({value: DateTime.local().minus(oneDay)});
        expect(wrapper.find('label.present').exists()).toBe(false);

        mountComponent({value: DateTime.local()});
        expect(wrapper.find('label.present').exists()).toBe(true);

        mountComponent({value: DateTime.local().plus(oneDay)});
        expect(wrapper.find('label.present').exists()).toBe(false);
    });

    it('Adds class .future to days in the future', () => {
        
        const oneDay = Duration.fromObject({days: 1});
        mountComponent({value: DateTime.local().minus(oneDay)});
        expect(wrapper.find('label.future').exists()).toBe(false);

        mountComponent({value: DateTime.local()});
        expect(wrapper.find('label.future').exists()).toBe(false);

        mountComponent({value: DateTime.local().plus(oneDay)});
        expect(wrapper.find('label.future').exists()).toBe(true);
    });
});