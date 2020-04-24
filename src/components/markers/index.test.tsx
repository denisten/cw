import { shallow } from 'enzyme';
import { Markers, TypeOfMarkers } from '.';
import React from 'react';
import { TowersTypes } from '../../effector/towers-progress/store';

describe('<Markers />', () => {
  it('Component Markers have correct props and rendered', () => {
    const props = {
      markersCollection: [
        { type: TypeOfMarkers.SUCCESS },
        { type: TypeOfMarkers.NOTICE },
      ],
      towerTitle: TowersTypes.ARENA,
      displayFlag: true,
    };
    shallow(<Markers {...props} />);
  });
});
