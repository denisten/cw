import React from 'react';
import { ImgWrapper } from '../img-wrapper';
import updateImg from './update-img.png';
import { TowersTypes } from '../../effector/towers-progress/store';
import { showUpgradeIcon } from '../../effector/app-condition/events';
const StyleConfig = {
  height: '50px',
  width: '50px',
  zIndex: 20,
  top: '0%',
  left: '50%',
  position: 'absolute',
  transformTranslate: '-50%, -50%',
  hoverFlag: true,
};

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  towerTitle,
  animFlag = false,
}) => {
  return (
    <ImgWrapper
      animFlag={animFlag}
      src={updateImg}
      {...StyleConfig}
      callBack={() => showUpgradeIcon(towerTitle)}
    />
  );
};

type UpgradeButtonProps = {
  towerTitle: TowersTypes;
  animFlag?: boolean;
};
