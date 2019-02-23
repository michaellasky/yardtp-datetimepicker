import React from 'react';
import { CalendarDay, defaultStyles } from 'yardtp-datetimepicker';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import injectSheet from 'react-jss';

let wrapper;
        
Enzyme.configure({ adapter: new Adapter() });

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

        mountComponent({ dayOfMonth: 42 });

        expect(wrapper.find('label').text()).toBe("42");
    });

    it('Calls props.setSelectedValue with props.value when clicked', () => {

        const setSelDay = jest.fn();
        mountComponent({
            setSelectedDay: setSelDay,
            isInRange: true, 
            timestamp: 12345
        });

        expect(setSelDay.mock.calls.length).toBe(0);

        wrapper.find('a').simulate('click');
        
        expect(setSelDay.mock.calls.length).toBe(1);
        expect(setSelDay.mock.calls[0][0]).toEqual(12345);
    });

    it('Adds dynamic inRangeDay class to dates within the selectable range', () => {

        let inRangeDayClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            inRangeDayClass = props.classes.inRangeDay;
            return <CalendarDay {...props} />;
        });

        wrapper = mount(<Styled isInRange={true} />);
        expect(wrapper.find(`a.${inRangeDayClass}`).exists()).toBe(true);
        
        wrapper = mount(<Styled isInRange={false} />);
        expect(wrapper.find(`a.${inRangeDayClass}`).exists()).toBe(false);
    });

    it('Adds dynamic outOfRangeDay class for days outside the selectable range', () => {

        let outOfRangeClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            outOfRangeClass = props.classes.outOfRangeDay;
            return <CalendarDay {...props} />;
        });

        wrapper = mount(<Styled isInRange={false} />);
        expect(wrapper.find(`a.${outOfRangeClass}`).exists()).toBe(true);

        wrapper = mount(<Styled isInRange={true} />);
        expect(wrapper.find(`a.${outOfRangeClass}`).exists()).toBe(false);
    });

    it('Adds dynamic previousMonthDay class for days in the month prior to the calValue month', () => {
    
        let prevMonthClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            prevMonthClass = props.classes.previousMonthDay;
            return <CalendarDay {...props} />;
        });

        wrapper = mount(<Styled isPrevMonth={true} />);
        expect(wrapper.find(`a.${prevMonthClass}`).exists()).toBe(true);

        wrapper = mount(<Styled isPrevMonth={false} />);
        expect(wrapper.find(`a.${prevMonthClass}`).exists()).toBe(false);
    });

    it('Adds dynamic currentMonthDay class for days within calValue month', () => {

        let currentMonthClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            currentMonthClass = props.classes.currentMonthDay;
            return <CalendarDay {...props} />;
        });

        wrapper = mount(<Styled isPrevMonth={false} isNextMonth={true} />);
        expect(wrapper.find(`a.${currentMonthClass}`).exists()).toBe(false);

        wrapper = mount(<Styled isPrevMonth={false} isNextMonth={false} />);
        expect(wrapper.find(`a.${currentMonthClass}`).exists()).toBe(true);
;
        wrapper = mount(<Styled isPrevMonth={true} isNextMonth={false} />);
        expect(wrapper.find(`a.${currentMonthClass}`).exists()).toBe(false);
    });

    it('Adds dynamic nextMonthDay class for days in month after calValue month', () => {

        let nextMonthClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            nextMonthClass = props.classes.nextMonthDay;
            return <CalendarDay {...props} />;
        });

        wrapper = mount(<Styled isNextMonth={false} />);
        expect(wrapper.find(`a.${nextMonthClass}`).exists()).toBe(false);

        wrapper = mount(<Styled isNextMonth={true} />);
        expect(wrapper.find(`a.${nextMonthClass}`).exists()).toBe(true);
    });

    it('Adds dynamic presentDay class to the current day', () => {

        const today = new Date();
        let presentDayClass;
        const Styled = injectSheet (defaultStyles) ((props) => {
            presentDayClass = props.classes.presentDay;
            return <CalendarDay {...props} />;
        });``

        wrapper = mount(<Styled isSameDay={true} />);
        expect(wrapper.find(`a.${presentDayClass}`).exists()).toBe(true);

        wrapper = mount(<Styled isSameDay={false} />);
        expect(wrapper.find(`a.${presentDayClass}`).exists()).toBe(false);
    });
});