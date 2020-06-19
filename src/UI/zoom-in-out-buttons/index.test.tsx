import React from 'react';
import { shallow, mount } from 'enzyme';
import { ZoomInOutButtons } from '.';

describe('<ZoomInOutButtons />', () => {
  it('render zoom buttons is successfully', () => {
    shallow(<ZoomInOutButtons scaleValue={1} />);
  });
  it('have found two zoom buttons', () => {
    const buttonWrapper = mount(<ZoomInOutButtons scaleValue={1} />);
    const buttonCollection = buttonWrapper.find('i');
    expect(buttonCollection.length).toEqual(2);
  });
});
