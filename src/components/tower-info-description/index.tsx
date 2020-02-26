import React from 'react';
import styled from 'styled-components';

const TowerInfoDescriptionWrapper = styled.div`
  font-family: SFProDisplay;
  font-size: 16px;
  line-height: 1.5;
  color: #000000;
`;

type TowerInfoDescriptionProps = {
  text: string;
};

export const TowerInfoDescription: React.FC<TowerInfoDescriptionProps> = ({
  text,
}) => {
  return <TowerInfoDescriptionWrapper>{text}</TowerInfoDescriptionWrapper>;
};
