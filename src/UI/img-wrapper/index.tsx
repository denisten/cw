import React from 'react';
import styled, { keyframes } from 'styled-components';
const scaleAnimation = (scaleSize: number) => keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(${scaleSize});
  }
`;

const defaultScaleSize = 1.1;
const ParentDivWrapper = styled.div<ParentDivWrapperProps>`
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
`;

const ImgWrapperNoMemo: React.FC<ImgWrapperProps> = ({
  callBack,
  position,
  top,
  left,
  bottom,
  right,
  src,
  zIndex,
  transformTranslate,
  height,
  hoverFlag = false,
  children,
  displayFlag = true,
  animFlag = false,
  scaleSize,
  ...props
}) => {
  return (
    <ParentDivWrapper
      displayFlag={displayFlag}
      position={position}
      zIndex={zIndex}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      hoverFlag={hoverFlag}
      height={height}
      transformTranslate={transformTranslate}
      animFlag={animFlag}
      scaleSize={scaleSize}
    >
      <ImgStyledWrapper {...props} onClick={callBack} src={src} />
      {children}
    </ParentDivWrapper>
  );
};

export const ImgWrapper = React.memo(ImgWrapperNoMemo);

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
}

export interface ImgWrapperProps extends ParentDivWrapperProps {
  callBack?: () => void;
  src: string;
  children?: React.ReactElement[] | React.ReactElement;
}
