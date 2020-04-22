import React from 'react';
import { shallow, mount } from 'enzyme';
import { Preloader } from '.';

test('render preloader is successfully', () => {
  shallow(<Preloader />);
});

test('Preloader component have clouds', () => {
  const component = mount(<Preloader />);
  const cloudsCollection = component.find('.cloud');
  expect(!!cloudsCollection.length).toBe(true);
});

test('first start component must have flag false', () => {
  const wrapper = mount(<Preloader />);
  expect(!!wrapper.getElement().props.disable).toBe(false);
});
