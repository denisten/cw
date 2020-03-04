import React from 'react';
import styled from 'styled-components';
import { defaultScaleSize, scaleAnimation } from '../../hoc/scale-anim';

const ParentDivWrapper = styled.div<ParentDivWrapperProps>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: ${props => props.position || 'absolute'};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  bottom: ${props => props.bottom}%;
  right: ${props => props.right}%;
  display: ${props => (props.displayFlag ? 'inline-block' : 'none')};
  z-index: ${props => props.zIndex};
  transform: translate(${props => props.transformTranslate});
  animation-name: ${props =>
    props.animFlag
      ? scaleAnimation(props.scaleSize || defaultScaleSize)
      : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.6s;
  &:hover {
    cursor: ${props => (props.hoverFlag ? 'pointer' : 'auto')};
  }
`;

const ImgStyledWrapper = styled.img`
  height: 100%;
  width: 100%;
`;

export const ImgWrapper = React.memo(
  ({
    callBack,
    src,
    children,
    hoverFlag = false,
    displayFlag = true,
    animFlag = false,
    ...props
  }: ImgWrapperProps) => {
    return (
      <ParentDivWrapper
        displayFlag={displayFlag}
        hoverFlag={hoverFlag}
        animFlag={animFlag}
        {...props}
        onClick={callBack}
      >
        <ImgStyledWrapper src={src} />
        {children}
      </ParentDivWrapper>
    );
  }
);

interface ParentDivWrapperProps {
  position?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  hoverFlag?: boolean;
  zIndex?: number;
  transformTranslate?: string;
  height?: string;
  displayFlag?: boolean;
  animFlag?: boolean;
  scaleSize?: number;
  width?: string;
}

export interface ImgWrapperProps extends ParentDivWrapperProps {
  callBack?: () => void;
  src: string;
  children?: React.ReactElement[] | React.ReactElement;
}
