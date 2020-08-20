import React from 'react';

import line from './line.png';
import whiteLine from './whiteline.png';
import back from './back.png';
import circle from './circle.png';
import styled from 'styled-components';

const Body = styled.div`
  width: 300px;
  height: 300px;
  background: url(${back}) no-repeat center;
  background-size: 100% 100%;
  z-index: 100;
  position: absolute;
  left: 10%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const Line = styled.img.attrs({ alt: 'line' })`
  width: 10%;
  height: 100%;
`;

const lineConfig: ILineConfig[] = [
  {
    style: {
      marginRight: '3%',
      position: 'absolute',
      left: '0%',
      bottom: '25%',
    },
    src: whiteLine,
  },
  { style: { marginRight: '1%', marginLeft: '3%' }, src: line },
  { style: { marginRight: '1.5%' }, src: line },
  { style: { marginRight: '-1%' }, src: line },
  { style: { marginRight: '-1.5%' }, src: line },
  { style: { marginRight: '-1%' }, src: line },
  { style: { marginRight: '-2%' }, src: line },
  { style: { marginRight: '0%' }, src: line },
  { style: { position: 'absolute', right: '0%', top: '0%' }, src: whiteLine },
];

export const TowerUpgradeAnimation = () => {
  return (
    <Body>
      {lineConfig.map((lineItem, ind) => (
        <Line key={ind} src={lineItem.src} style={lineItem.style} />
      ))}
      {/* <Line src={whiteLine}></Line>
      <Line src={line}></Line>
      <Line src={line}></Line>
      <Line src={line}></Line>
      <Line src={line}></Line>
      <Line src={line}></Line>
      <Line src={line}></Line>
      <Line src={line}></Line>
      <Line src={whiteLine}></Line> */}
    </Body>
  );
};

interface ILineConfig {
  style: React.CSSProperties;
  src: string;
}
