import React from 'react';
import styled from 'styled-components';
import zoomIn from './zoomIn.svg';
import zoomOut from './zoomOut.svg';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const Button = styled.div<{ foolSize: boolean }>`
  width: 53px;
  height: 53px;
  background-image: url(${props => (props.foolSize ? zoomIn : zoomOut)});
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translate(0, 50%);
  z-index: ${ZIndexes.UI_BUTTON};
  cursor: pointer;
`;
export const ZoomButton: React.FC<IZoomButton> = ({
  callBack,
  fullSizeMode,
}) => {
  return <Button foolSize={fullSizeMode} onClick={callBack} />;
};

interface IZoomButton {
  callBack: () => void;
  fullSizeMode: boolean;
}
