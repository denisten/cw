import React from 'react';
import styled from 'styled-components';

const TowerInfoDescriptionWrapper = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #001424;
  height: 300px;
  overflow: hidden;
  padding-right: 80px;
  display: flex;
  flex-direction: column;

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
  }
`;

type TowerInfoDescriptionProps = {
  text: Array<string> | string;
};

export const TowerInfoDescription: React.FC<TowerInfoDescriptionProps> = ({
  text,
}) => {
  const spanElems =
    typeof text === 'object' && text.length > 0
      ? text.map((elem, ind) => <span key={ind}>{elem}</span>)
      : text;
  return <TowerInfoDescriptionWrapper>{spanElems}</TowerInfoDescriptionWrapper>;
};
