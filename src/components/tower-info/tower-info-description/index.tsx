import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { MTSSans } from '../../../fonts';
import {
  TutorialConditions,
  TutorialStore,
} from '../../../effector/tutorial-store/store';
import { device } from '../../../UI/media';

const TowerInfoDescriptionWrapper = styled.div<ITowerInfoDescriptionWrapper>`
  color: #001424;
  height: ${props => (props.fullView ? '322px' : '268px')};
  overflow: hidden;
  display: flex;
  position: relative;
  font-family: ${MTSSans.REGULAR};
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

  p {
    width: 90%;
    word-break: break-word;

    @media screen and (max-width: 1440px) {
      width: 380px;
    }
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

const Title = styled.span`
  font-size: 20px;
  margin-bottom: 20px;
  line-height: 26px;
  letter-spacing: -0.5px;
  color: #02acc8;

  p {
    margin: 0;
  }
`;

const Description = styled.span`
  p {
    margin: 0;
  }
`;

const isFullView = (tutorialCondition: TutorialConditions) =>
  tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO ||
  !tutorialCondition;

const createMarkup = (html: string) => {
  return { __html: html };
};

export const TowerInfoDescription: React.FC<ITowerInfoDescription> = ({
  productDescription,
  hideDescription = false,
}) => {
  const { tutorialCondition } = useStore(TutorialStore);

  const description = !hideDescription && (
    <Description
      dangerouslySetInnerHTML={createMarkup(productDescription.description)}
    />
  );

  return (
    <TowerInfoDescriptionWrapper fullView={isFullView(tutorialCondition)}>
      <TowerInfoDescriptionScrollContainer>
        <Title
          dangerouslySetInnerHTML={createMarkup(productDescription.title)}
        />
        {description}
      </TowerInfoDescriptionScrollContainer>
    </TowerInfoDescriptionWrapper>
  );
};

export interface ITowerInfoDescription {
  productDescription: {
    description: string;
    title: string;
  };
  hideDescription: boolean;
}

interface ITowerInfoDescriptionWrapper {
  fullView?: boolean;
}
