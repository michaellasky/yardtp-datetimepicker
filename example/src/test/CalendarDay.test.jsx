import React from 'react';
import { CalendarDay, defaultStyles } from 'yardtp-datetimepicker';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import injectSheet from 'react-jss';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import getDate from 'date-fns/getDate';

let wrapper;
        
Enzyme.configure({ adapter: new Adapter() });

const now = new Date(1985, 9, 26, 1, 21);
const yesterday = new Date(1985, 9, 25, 1, 21);
const tomorrow = new Date(1985, 9, 27, 1, 21);
const lastMonth = new Date(1985, 8, 25, 1, 21);
const nextMonth = new Date(1985, 10, 25, 1, 21);

describe('<CalendarDay />', () => {

    beforeEach(() => {});

    afterEach(() => {
        if (wrapper !== null) { wrapper.unmount()}
        wrapper = null;
    });

    function mountComponent(props) {
        wrapper = shallow(<CalendarDay {...props} />);
    } 

    it ('Renders without crashing', () => {
        mountComponent();
    });

    it('Sets the displayed day equal to props.value', () => {

        mountComponent({ value: now, selectedValue: yesterday});

        expect(wrapper.find('label').text()).toBe(getDate(now).toString());
    });

    it('Calls props.setSelectedValue with props.value when clicked', () => {

        const setSelVal = jest.fn();
        mountComponent({
            value: now, 
            state: [yesterday, setSelVal]
        });

        expect(setSelVal.mock.calls.length).toBe(0);

        wrapper.find('a').simulate('click');
        
        expect(setSelVal.mock.calls.length).toBe(1);
        expect(setSelVal.mock.calls[0][0]).toEqual(now);
    });

    it('Adds dynamic inRangeDay class to dates within the selectable range', () => {

        let inRangeDayClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            inRangeDayClass = props.classes.inRangeDay;
            return <CalendarDay {...props} />;
        });

        let props = {value: now, validDates: { start: yesterday, end: tomorrow } };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${inRangeDayClass}`).exists()).toBe(true);

        props = {value: tomorrow, validDates: { start: yesterday, end: now } };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${inRangeDayClass}`).exists()).toBe(false);

        props = {value: now, validDates: { start: yesterday, end: yesterday } };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${inRangeDayClass}`).exists()).toBe(false);

    });

    it('Adds dynamic outOfRangeDay class for days outside the selectable range', () => {

        let outOfRangeClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            outOfRangeClass = props.classes.outOfRangeDay;
            return <CalendarDay {...props} />;
        });

        let props = {value: tomorrow, validDates: { start: yesterday, end: now } };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${outOfRangeClass}`).exists()).toBe(true);

        props = {value: now, validDates: { start: yesterday, end: tomorrow } };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${outOfRangeClass}`).exists()).toBe(false);
    });

    it('Adds dynamic previousMonthDay class for days in the month prior to the calValue month', () => {
    
        let prevMonthClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            prevMonthClass = props.classes.previousMonthDay;
            return <CalendarDay {...props} />;
        });

        let props = {calValue: now, value: lastMonth};
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${prevMonthClass}`).exists()).toBe(true);

        props = {calValue: now, value: now};
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${prevMonthClass}`).exists()).toBe(false);

        props = {calValue: now, value: nextMonth};
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${prevMonthClass}`).exists()).toBe(false);
    });

    it('Adds dynamic currentMonthDay class for days within calValue month', () => {

        let currentMonthClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            currentMonthClass = props.classes.currentMonthDay;
            return <CalendarDay {...props} />;
        });

        let props = {calValue: now, value: lastMonth };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${currentMonthClass}`).exists()).toBe(false);

        props = {calValue: now, value: now };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${currentMonthClass}`).exists()).toBe(true);

        props = {calValue: now, value: nextMonth };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${currentMonthClass}`).exists()).toBe(false);
    });

    it('Adds dynamic nextMonthDay class for days in month after calValue month', () => {

        let nextMonthClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            nextMonthClass = props.classes.nextMonthDay;
            return <CalendarDay {...props} />;
        });

        let props = {calValue: now, value: lastMonth };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${nextMonthClass}`).exists()).toBe(false);

        props = {calValue: now, value: now };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${nextMonthClass}`).exists()).toBe(false);

        props = {calValue: now, value: nextMonth };
        wrapper = mount(<Styled {...props} />);
        expect(wrapper.find(`a.${nextMonthClass}`).exists()).toBe(true);
    });

    it('Adds dynamic presentDay class to the current day', () => {

        const today = new Date();
        let presentDayClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            presentDayClass = props.classes.presentDay;
            return <CalendarDay {...props} />;
        });``

        wrapper = mount(<Styled value={today} />);
        expect(wrapper.find(`a.${presentDayClass}`).exists()).toBe(true);

        wrapper = mount(<Styled value={addDays(today, 1)} />);
        expect(wrapper.find(`a.${presentDayClass}`).exists()).toBe(false);

        wrapper = mount(<Styled value={subDays(today, 1)} />);
        expect(wrapper.find(`a.${presentDayClass}`).exists()).toBe(false);
    });
});