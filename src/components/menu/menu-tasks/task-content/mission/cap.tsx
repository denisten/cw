import styled from 'styled-components';
import title from './title.svg';
import noMissionImg from './no-mission.svg';
import description from './desctiption.svg';
import React from 'react';

const CapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

const TitleCap = styled.img.attrs({ src: title, alt: 'title' })`
  margin-top: 15px;
`;
const NoMissionImgCap = styled.img.attrs({
  src: noMissionImg,
  alt: 'noMissionImg',
})``;

const DescriptionCap = styled.img.attrs({
  src: description,
  alt: 'description',
})`
  margin-top: 5px;
`;

export const Cap = () => (
  <CapWrapper>
    <NoMissionImgCap />
    <TitleCap />
    <DescriptionCap />
  </CapWrapper>
);
