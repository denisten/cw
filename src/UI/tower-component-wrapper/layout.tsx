import React from 'react';
import { IMarkers, Markers } from '../../components/markers';
import { IUpgradeButton, UpgradeButton } from '../update-button';
import { TowerUpgradeAnimation } from '../tower-upgrade-animation';
import { FRRImg, IFRRImg } from '../../components/first-render-require-img';
import styled from 'styled-components';
import signBcg from './signBcg.svg';
import { MTSSans } from '../../fonts';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { TowersTypes } from '../../effector/towers-progress/store';
import lock from './lock.png';

enum strokeClassNames {
  STROKE = 'stroke',
  STROKE_ACTIVE = 'strokeActive',
}
export const fixSizeClassName = 'fix-size';

export enum TowerClassNames {
  MUTED = 'muted',
  HOVERED = 'hovered',
  TOWER_IMG = 'towerImg',
  LOCK_IMG = 'lockImg',
}

export const Signature = styled.div`
  position: absolute;
  min-height: 32px;
  z-index: 2;
  background-image: url(${signBcg});
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 25px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  opacity: 0;
  transition: opacity 0.4s;
  bottom: -10%;
`;

const SpanElem = styled.div<ISpanElem>`
  font-family: ${props =>
    props.mtsFlag ? MTSSans.ULTRA_WIDE : MTSSans.MEDIUM};
  font-size: 16px;
  line-height: 22px;
  color: #e61818;
  box-sizing: border-box;
  &:first-child {
    margin-right: 8px;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const LockImage = styled.img.attrs({
  className: TowerClassNames.LOCK_IMG,
  alt: 'img',
  src: lock,
})`
  width: 60px;
  height: 75px;
  position: absolute;
  top: 50%;
  z-index: 2;
`;

const TowerStyledWrapper = styled.div<ITowerStyledWrapper>`
  display: flex;
  position: absolute;
  top: ${props => props.posX}%;
  left: ${props => props.posY}%;
  z-index: ${props => props.zIndex};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  scroll-margin-right: ${props =>
    props.scrollShift && props.DOMLoaded ? props.scrollShift : 0}px;
  justify-content: center;
  &.${TowerClassNames.HOVERED} ${Signature} {
    opacity: 1 !important;
  }
  
  img.${TowerClassNames.TOWER_IMG} {
    filter: ${props => (props.mutedImg ? 'grayscale(100%)' : '')};
  }
  
  
  &.${TowerClassNames.MUTED} {
    &::before {
      content: 'Скоро открытие';
      position: absolute;
      top: 85%;
      padding: 6px;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      font-size: 18px;
      font-family: ${MTSSans.BOLD};
      white-space: nowrap;
      border-radius: 4px;
      z-index: 2;
    } 
  }
  .${strokeClassNames.STROKE} {
    display: none;
  }
  .${strokeClassNames.STROKE_ACTIVE} {
    display: block;
  }
  &:hover {
    z-index: ${ZIndexes.HOVERED_BUILDING} !important;
  }
  &[data-towertype=${TowersTypes.UNIVERSITY}] ${Signature} {
    bottom: 10%;
  }
  &[data-towertype=${TowersTypes.FITNESS}] ${Signature} {
    bottom: 0;
  }
  &[data-towertype=${TowersTypes.TV}] ${Signature},
  &[data-towertype=${TowersTypes.THEATER}] ${Signature} {
    bottom: 5%;
  }
  
  &[data-towertype=${TowersTypes.PARTNER_ONE}] img.${TowerClassNames.LOCK_IMG} {
    top: 69%;
  }
  
    &[data-towertype=${TowersTypes.PARTNER_TWO}] img.${
  TowerClassNames.LOCK_IMG
} {
    top: 63%;
  }
  
      &[data-towertype=${TowersTypes.MARVIN}] img.${TowerClassNames.LOCK_IMG} {
    top: 57%;
  }
  
        &[data-towertype=${TowersTypes.IGROTEKA}] img.${
  TowerClassNames.LOCK_IMG
} {
    top: 61%;
  }
  
          &[data-towertype=${TowersTypes.PARTNER_THREE}] img.${
  TowerClassNames.LOCK_IMG
},
           &[data-towertype=${TowersTypes.OBSERVATORY}] img.${
  TowerClassNames.LOCK_IMG
}
           {
    top: 64%;
  }
  

  

`;
export const TowerComponentWrapperLayout: React.FC<ITowerComponentWrapperLayout> = props => {
  return (
    <TowerStyledWrapper
      {...props.towerStyledWrapperProps}
      mutedImg={props.mutedImg}
      data-towertype={props.towerTitle}
    >
      {props.mutedImg && <LockImage />}
      {!props.mutedImg && <Markers {...props.markersProps} />}
      <UpgradeButton {...props.upgradeButtonProps} />
      {props.upgradeFlag && (
        <TowerUpgradeAnimation wideTower={props.wideTower} />
      )}
      <FRRImg {...props.FRRImgProps} />
      <map name={props.towerImg}>
        <area alt="area" shape="rect" {...props.areaProps} />
      </map>
      <img {...props.strokeProps} alt="shadow" />
      {props.signConfig && (
        <Signature>
          {props.signConfig.map((signElem, ind) => (
            <SpanElem
              mtsFlag={signElem === 'МТС' || signElem === 'MTS'}
              key={ind}
            >
              {signElem}
            </SpanElem>
          ))}
        </Signature>
      )}
    </TowerStyledWrapper>
  );
};

interface ITowerComponentWrapperLayout {
  towerStyledWrapperProps: ITowerStyledWrapper;
  mutedImg?: boolean;
  markersProps: IMarkers;
  upgradeButtonProps: IUpgradeButton;
  upgradeFlag: boolean;
  wideTower: boolean;
  towerImg: string | undefined;
  FRRImgProps: IFRRImg;
  areaProps: IArea;
  strokeProps: IStroke;
  signConfig?: string[];
  towerTitle: TowersTypes;
}

interface ITowerStyledWrapper {
  posX: number;
  posY: number;
  zIndex?: number;
  width: number;
  height: number;
  scrollShift?: number | null;
  DOMLoaded: boolean;
  mutedImg?: boolean;
}

interface ISpanElem {
  mtsFlag: boolean;
}

interface IArea {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseMove: () => void;
  coords: string;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

interface IStroke {
  ref: React.RefObject<HTMLImageElement>;
  className: string;
  src: string;
}
