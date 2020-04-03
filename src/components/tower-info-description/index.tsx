import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import {
  TutorialStore,
  TutorialConditions,
} from '../../effector/tutorial-store/store';
import { device } from '../../UI/media';

const TowerInfoDescriptionWrapper = styled.div<{ fullView?: boolean }>`
  color: #001424;
  height: ${props => (props.fullView ? '322px' : '268px')};
  overflow: hidden;
  display: flex;
  position: relative;
  font-family: 'MTSSansRegular';
  letter-spacing: 0;
  margin-bottom: 30px;
  margin-top: 40px;

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
  }

  @media ${device.laptopS} {
    height: 280px;
    margin-bottom: 15px;
  }

  span {
    width: 90%;
    word-break: break-word;

    @media screen and (max-width: 1440px) {
      width: 380px;
    }
  }

  span:last-child {
    z-index: 3;
  }

  span:first-child {
    font-size: 20px;
    line-height: 1.3;
    margin-bottom: 24px;
  }

  &::before {
    content: '';
    width: 100%;
    height: 39px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      to bottom,
      rgba(243, 243, 243, 0),
      #f3f3f3
    );
  }
`;

const TowerInfoDescriptionScrollContainer = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #001424;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

type TowerInfoDescriptionProps = {
  text: Array<string>;
};

export const TowerInfoDescription: React.FC<TowerInfoDescriptionProps> = ({
  text,
}) => {
  const { tutorialCondition } = useStore(TutorialStore);
  return (
    <TowerInfoDescriptionWrapper
      fullView={
        tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO ||
        !tutorialCondition
      }
    >
      <TowerInfoDescriptionScrollContainer>
        {text.map((elem, ind) => (
          <span key={ind}>{elem}</span>
        ))}
      </TowerInfoDescriptionScrollContainer>
    </TowerInfoDescriptionWrapper>
  );
};
