import React, { useState, useEffect } from 'react';
import banner from './banner.png';
import styled from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { MTSSans } from '../../fonts';
import { useStore } from 'effector-react';
import { UserDataStore } from '../../effector/user-data/store';

const Banner = styled.div`
  width: 175px;
  height: 195px;
  background: url(${banner}) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: 59%;
  top: 36%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 58px;
`;

const Title = styled.span`
  text-align: center;
  color: #35647b;
  text-transform: uppercase;
  font-family: ${MTSSans.MEDIUM};
  transform: skewY(28deg);
  letter-spacing: -1px;
  font-size: 14px;
  position: relative;
  right: 8px;
  line-height: 1.2;
`;

const HeadTitle = styled(Title)<{ fontSize: string }>`
  line-height: 1.5;
  font-size: 14px;
  font-family: ${MTSSans.BOLD};
  letter-spacing: -1px;
  font-size: ${props => props.fontSize};
`;

enum TextSize {
  SHORT = 6,
  MEDIUM = 9,
  BIG = 12,
}

const returnFontSize = (wordLength: number) => {
  if (wordLength <= TextSize.SHORT) {
    return '26px';
  } else if (wordLength > TextSize.SHORT && wordLength <= TextSize.MEDIUM) {
    return '18px';
  } else {
    return '17px';
  }
};

export const CentralBanner: React.FC = () => {
  const { worldName } = useStore(UserDataStore);
  const [wordLength, setWordLength] = useState(0);
  useEffect(() => {
    setWordLength(worldName.length);
  }, [worldName]);

  return (
    <Banner>
      <Title>Добро</Title>
      <Title>пожаловать</Title>
      <HeadTitle fontSize={returnFontSize(wordLength)}>{worldName}</HeadTitle>
    </Banner>
  );
};
