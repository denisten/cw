import React from 'react';
import { IPopUp, PopUp, TypesOfPopUps } from '../../../../UI/pop-up';
import { RowWrapper } from '../../../../UI/row-wrapper';
import { CoinsWallet } from '../../../../UI/wallet';
import {
  TutorialOverlay,
  TutorialOverlayTopLayer,
} from '../../../tutorial-overlay';
import { TutorialConditions } from '../../../../effector/tutorial-store/store';
import { zIndexForInheritOverlay } from '../../../../constants';
import penImg from './pen.svg';
import profileIcon from './profile-icon.svg';
import { Button, ButtonClassNames } from '../../../../UI/button';
import styled from 'styled-components';
import { defaultScaleSize, scaleAnimation } from '../../../../hoc/scale-anim';
import { StyledSpan } from '../../../../UI/span';
import { MTSSans } from '../../../../fonts';

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 51px;
  box-sizing: border-box;
`;

const PenWrapper = styled.img<IPenWrapper>`
  cursor: pointer;
  animation-name: ${props =>
    props.animFlag
      ? scaleAnimation(props.scaleSize || defaultScaleSize)
      : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  margin-left: 12px;
`;

const WorldTitle = styled(StyledSpan)`
  font-family: ${MTSSans.BLACK};
  font-size: 24px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.6px;
  text-align: center;
  color: #001424;
  margin-right: 9px;
  cursor: pointer;
`;

const styledConfig = {
  coinsWallet: {
    marginRight: '60px',
  } as React.CSSProperties,
  profileIcon: {
    paddingBottom: '32px',
  },
  rowWrapper: {
    padding: '28px 10px',
    margin: '31px 0 0 0',
    left: '12px',
    background: 'white',
  },
  moneyWallet: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  penWrapper: {
    alt: 'pen',
    scaleSize: 1.4,
  },
};
interface INotAuthorizedLayout {
  worldName: string;
  money: number;
  tutorialCondition: TutorialConditions;
  handlePenClick: () => void;
  handleButtonClick: () => void;
  openPopUpState: TypesOfPopUps;
  popUpConfig: IPopUp;
}
export const NotAuthorizedLayout: React.FC<INotAuthorizedLayout> = props => {
  return (
    <ProfileWrapper>
      <PopUp {...props.popUpConfig} />
      <RowWrapper style={styledConfig.moneyWallet}>
        <CoinsWallet
          sum={String(props.money)}
          style={styledConfig.coinsWallet}
        />
      </RowWrapper>
      <TutorialOverlayTopLayer
        zIndex={
          props.tutorialCondition ===
          TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME
            ? zIndexForInheritOverlay + 1
            : zIndexForInheritOverlay - 1
        }
      >
        <RowWrapper {...styledConfig.rowWrapper}>
          <WorldTitle onClick={props.handlePenClick}>
            {props.worldName}
            <PenWrapper
              {...styledConfig.penWrapper}
              src={penImg}
              animFlag={
                props.tutorialCondition ===
                TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME
              }
            />
          </WorldTitle>
        </RowWrapper>
      </TutorialOverlayTopLayer>
      <img src={profileIcon} alt="profile" style={styledConfig.profileIcon} />
      <TutorialOverlayTopLayer
        zIndex={
          props.tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON
            ? zIndexForInheritOverlay + 1
            : zIndexForInheritOverlay - 1
        }
      >
        <Button
          pulseAnimFlag={
            props.tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON
          }
          className={ButtonClassNames.NORMAL}
          content="Войти"
          callback={props.handleButtonClick}
        />
      </TutorialOverlayTopLayer>
      <TutorialOverlay
        displayFlag={
          props.tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON ||
          props.tutorialCondition ===
            TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME
        }
        zIndex={zIndexForInheritOverlay}
      />
    </ProfileWrapper>
  );
};
interface IPenWrapper {
  scaleSize?: number;
  animFlag?: boolean;
}
