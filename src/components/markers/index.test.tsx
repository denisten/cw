import { shallow, mount } from 'enzyme';
import { Markers, TypeOfMarkers } from '.';
import React from 'react';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TimerBody } from './timer';

describe('<Markers />', () => {
  it('Component Markers have correct props and rendered', () => {
    const props = {
      markersCollection: [
        { type: TypeOfMarkers.SUCCESS },
        { type: TypeOfMarkers.NOTICE },
      ],
      towerTitle: TowersTypes.LIVE_ARENA,
      displayFlag: true,
    };
    shallow(<Markers {...props} />);
  });

  it('timer marker is rendered', () => {
    const props = {
      markersCollection: [
        {
          type: TypeOfMarkers.TIMER,
          startTime: new Date('Apr 22 2020 08:04:33 GMT+0300'),
          endTime: new Date('Apr 22 2020 15:04:33 GMT+0300'),
        },
      ],
      towerTitle: TowersTypes.LIVE_ARENA,
      displayFlag: true,
    };
    const markers = mount(<Markers {...props} />);
    expect(markers.find(TimerBody).exists()).toBe(true);
  });

  it('time is out state when time range undefined', () => {
    const props = {
      markersCollection: [
        {
          type: TypeOfMarkers.TIMER,
          startTime: undefined,
          endTime: undefined,
        },
      ],
      towerTitle: TowersTypes.LIVE_ARENA,
      displayFlag: true,
    };
    const markers = mount(<Markers {...props} />);
    const timerBody = markers.find(TimerBody);
    expect(timerBody.find('span').text()).toBe('Время вышло');
  });
});
