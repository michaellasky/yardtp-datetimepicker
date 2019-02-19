import React from 'react';
import { CalendarDay, defStyles } from 'yardtp-datetimepicker';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { DateTime, Duration, Interval } from 'luxon';
import injectSheet from 'react-jss';

let wrapper;
        
Enzyme.configure({ adapter: new Adapter() });

const now = DateTime.local(1985, 10, 26, 1, 21);
const yesterday = now.minus(Duration.fromObject({'days': 1}));
const tomorrow = now.plus(Duration.fromObject({'days': 1}));
const lastMonth = now.minus(Duration.fromObject({'months': 1}));
const nextMonth = now.plus(Duration.fromObject({'months': 1}));

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

    it('Adds dynamic inRangeDay class to dates within the selectable range', () => {

        let inRangeDayClass;
        const Styled = injectSheet (defStyles) ((props) => {
            inRangeDayClass = props.classes.inRangeDay;
            return <CalendarDay {...props} />;
        });

        let props = {value: now, validDates: Interval.fromDateTimes(yesterday, tomorrow) };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${inRangeDayClass}`).exists()).toBe(true);

        props = {value: tomorrow, validDates: Interval.fromDateTimes(yesterday, now) };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${inRangeDayClass}`).exists()).toBe(false);

        props = {value: now, validDates: Interval.fromDateTimes(yesterday, yesterday) };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${inRangeDayClass}`).exists()).toBe(false);

    });

    it('Adds dynamic outOfRangeDay class to label for days outside the selectable range', () => {

        let outOfRangeClass;
        const Styled = injectSheet (defStyles) ((props) => {
            outOfRangeClass = props.classes.outOfRangeDay;
            return <CalendarDay {...props} />;
        });

        let props = {value: tomorrow, validDates: Interval.fromDateTimes(yesterday, now) };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${outOfRangeClass}`).exists()).toBe(true);

        props = {value: now, validDates: Interval.fromDateTimes(yesterday, tomorrow) };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${outOfRangeClass}`).exists()).toBe(false);
    });

    it('Adds dynamic previousMonthDay class to label for days in the month prior to the calValue month', () => {
    
        let prevMonthClass;
        const Styled = injectSheet (defStyles) ((props) => {
            prevMonthClass = props.classes.previousMonthDay;
            return <CalendarDay {...props} />;
        });

        let props = {calValue: now, value: lastMonth};
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${prevMonthClass}`).exists()).toBe(true);

        props = {calValue: now, value: now};
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${prevMonthClass}`).exists()).toBe(false);

        props = {calValue: now, value: nextMonth};
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${prevMonthClass}`).exists()).toBe(false);
    });

    it('Adds dynamic currentMonthDay class to label for days within calValue month', () => {

        let currentMonthClass;
        const Styled = injectSheet (defStyles) ((props) => {
            currentMonthClass = props.classes.currentMonthDay;
            return <CalendarDay {...props} />;
        });

        let props = {calValue: now, value: lastMonth };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${currentMonthClass}`).exists()).toBe(false);

        props = {calValue: now, value: now };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${currentMonthClass}`).exists()).toBe(true);

        props = {calValue: now, value: nextMonth };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${currentMonthClass}`).exists()).toBe(false);
    });

    it('Adds dynamic nextMonthDay class to label for days in month after calValue month', () => {

        let nextMonthClass;
        const Styled = injectSheet (defStyles) ((props) => {
            nextMonthClass = props.classes.nextMonthDay;
            return <CalendarDay {...props} />;
        });

        let props = {calValue: now, value: lastMonth };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${nextMonthClass}`).exists()).toBe(false);

        props = {calValue: now, value: now };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${nextMonthClass}`).exists()).toBe(false);

        props = {calValue: now, value: nextMonth };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`label.${nextMonthClass}`).exists()).toBe(true);
    });

    it('Adds dynamic presentDay class to the current day', () => {

        const oneDay = Duration.fromObject({days: 1});
        let presentDayClass;
        const Styled = injectSheet (defStyles) ((props) => {
            presentDayClass = props.classes.presentDay;
            return <CalendarDay {...props} />;
        });

        wrapper = mount(<Styled value={DateTime.local()} />);
        expect(wrapper.find(`label.${presentDayClass}`).exists()).toBe(true);

        wrapper = mount(<Styled value={DateTime.local().plus(oneDay)} />);
        expect(wrapper.find(`label.${presentDayClass}`).exists()).toBe(false);

        wrapper = mount(<Styled value={DateTime.local().minus(oneDay)} />);
        expect(wrapper.find(`label.${presentDayClass}`).exists()).toBe(false);
    });
});