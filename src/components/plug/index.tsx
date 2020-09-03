import React from 'react';
import styled from 'styled-components';
import desktopPlugImg from './desctop-plug-img.svg';
import mobilePlugImg from './mobile-plug-img.svg';
import { isMobile } from 'react-device-detect';

const Wrapper = styled.div<IWrapper>`
  width: 100vw;
  height: 100vh;
  background-image: url("${props =>
    props.isMobile ? mobilePlugImg : desktopPlugImg}");
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Plug = () => <Wrapper isMobile={isMobile} />;

interface IWrapper {
  isMobile: boolean;
}
