import React from 'react';
import styled from 'styled-components';
import zoomIn from './zoomIn.svg';
import zoomOut from './zoomOut.svg';
import { useStore } from 'effector-react';
import { AppConditionStore } from '../../effector/app-condition/store';
const Button = styled.div<{ foolSize: boolean }>`
  width: 53px;
  height: 53px;
  background-image: url(${props => (props.foolSize ? zoomIn : zoomOut)});
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translate(0, 50%);
`;
export const ZoomButton: React.FC<{ callBack?: () => void }> = ({
  callBack,
}) => {
  const { fullSizeMode } = useStore(AppConditionStore);
  return <Button foolSize={fullSizeMode} onClick={callBack} />;
};
