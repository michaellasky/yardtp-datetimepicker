import React from 'react';
import { DatePicker } from 'yardtp-datetimepicker';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

let wrapper;
        
Enzyme.configure({ adapter: new Adapter() });

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

