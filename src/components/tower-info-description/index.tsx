import React from 'react';
import styled from 'styled-components';

const TowerInfoDescriptionWrapper = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #001424;
  height: 300px;
  overflow: hidden;
  padding-right: 80px;

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
  }
`;

type TowerInfoDescriptionProps = {
  text: string;
};

export const TowerInfoDescription: React.FC<TowerInfoDescriptionProps> = ({
  text,
}) => {
  return <TowerInfoDescriptionWrapper>{text}</TowerInfoDescriptionWrapper>;
};
