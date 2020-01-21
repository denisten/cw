import React, { useEffect, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import styled from 'styled-components';
import { ModalWindow } from '../extra-tower-info-modal-window';
import { useStore } from 'effector-react';
import { AppConditionState } from '../../effector/app-condition/store';
import { Map } from '../map';
import { Buildings } from '../../buildings';
import mapTile from '../../img/map/map-tile.png';
import {
  updateScaleValue,
  ScaleValues,
  updateFocusOnValue,
} from '../../effector/app-condition/events';
import { ProfileButton } from '../profile-button';
import { ProfileModalWindow } from '../profile-modal-window';
import { ScaleButton } from '../../UI/scale-button';

const ComponentWrapper = styled.div`
  border: solid 5px #e2d7c7;
  background-image: url("${mapTile}");
  background-repeat: repeat;
  background-size: auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const MapWrapper = styled.div<{ scaleValue: number }>`
  display: block;
  width: 7680px;
  height: 5400px;
  position: relative;
  transform: scale(${props => props.scaleValue});
`;

const styleConfig = {
  button1: {
    top: 10,
    width: 3,
    height: 5,
    left: 10,
  },
  ScrollContainerStyle: {
    height: '100%',
    width: '100%',
  },
};

export const RootComponent = (): React.ReactElement => {
  const {
    isExtraTowerInfoModalOpen,
    isProfileInfoModalOpen,
    scaleValue,
    focusOn,
  } = useStore(AppConditionState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myRef: any = useRef<HTMLElement>(null);

  useEffect(() => {
    if (myRef.current) {
      const [cordX, cordY] = focusOn;
      const scrollContainerNode = myRef.current.container.current;
      if (scrollContainerNode) scrollContainerNode.scrollTo(cordX, cordY);
    }
  }, [isExtraTowerInfoModalOpen]);

  return (
    <ComponentWrapper id="rootScroll">
      {isProfileInfoModalOpen ? <ProfileModalWindow /> : ''}
      <ProfileButton />
      <ScaleButton
        scaleRefinements="0.5"
        {...styleConfig.button1}
        callBack={() => {
          updateScaleValue(ScaleValues.HALF);
        }}
      />

      <ModalWindow opened={isExtraTowerInfoModalOpen} />
      <ScrollContainer
        ref={myRef}
        style={styleConfig.ScrollContainerStyle}
        nativeMobileScroll={false}
        onEndScroll={(...args) => {
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          updateFocusOnValue(args.slice(0, 2));
        }}
      >
        <MapWrapper scaleValue={scaleValue}>
          <Map />
          <Buildings />
        </MapWrapper>
      </ScrollContainer>
    </ComponentWrapper>
  );
};
