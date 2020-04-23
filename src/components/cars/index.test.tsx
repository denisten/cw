import React from 'react';
import { shallow } from 'enzyme';
import { Car } from '.';
import { keyframes } from 'styled-components';
import { Cars } from './carsArray';
import { carConfig } from './carConfig';

describe('<Car />', () => {
  const carStyle = {
    animDuration: '8s',
    animationName: keyframes``,
    animationTimingFunction: 'ease-in-out',
    left: '35.4%',
    top: '39.1%',
  };
  it('all props passed to Car component', () => {
    shallow(<Car carStyle={carStyle} />);
  });

  it('component Cars have children and have not empty carConfig list', () => {
    const cars = shallow(<Cars />);
    expect(cars.props()).toHaveProperty('children');
    expect(cars.props().children).toHaveLength(carConfig.length);
    expect(cars.props().children.length).toBeGreaterThan(0);
  });
});
