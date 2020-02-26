import React from 'react';
import styled from 'styled-components';

const ParentDivWrapper = styled.div<ParentDivWrapperProps>`
  height: ${props => props.height};
  position: ${props => props.position || 'absolute'};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  bottom: ${props => props.bottom}%;
  right: ${props => props.right}%;
  display: flex;
  z-index: ${props => props.zIndex};
  transform: translate(${props => props.transformTranslate});
  &:hover {
    cursor: ${props => (props.hoverFlag ? 'pointer' : 'auto')};
  }
`;

const ImgStyledWrapper = styled.img`
  height: 100%;
`;

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
}

export interface ImgWrapperProps extends ParentDivWrapperProps {
  callBack?: () => void;
  src: string;
  children?: React.ReactElement[] | React.ReactElement;
}

export const ImgWrapper: React.FC<ImgWrapperProps> = ({
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
  ...props
}) => {
  return (
    <ParentDivWrapper
      position={position}
      zIndex={zIndex}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      hoverFlag={hoverFlag}
      height={height}
      transformTranslate={transformTranslate}
    >
      <ImgStyledWrapper {...props} onClick={callBack} src={src} />
      {children}
    </ParentDivWrapper>
  );
};
