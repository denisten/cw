import React from 'react';
import { ImgWrapper } from '../img-wrapper';
import updateImg from './update-img.png';
import { TowersTypes } from '../../effector/towers-progress/store';
import { showUpgradeIcon } from '../../effector/app-condition/events';
const StyleConfig = {
  height: '50px',
  zIndex: 9999,
  top: 0,
  left: 50,
  position: 'absolute',
  transformTranslate: '-50%, -50%',
  hoverFlag: true,
};

export const UpdateButton: React.FC<UpdateButtonProps> = ({ towerTitle }) => {
  return (
    <ImgWrapper
      src={updateImg}
      {...StyleConfig}
      callBack={() => showUpgradeIcon(towerTitle)}
    />
  );
};

type UpdateButtonProps = {
  towerTitle: TowersTypes;
};
