import React, { useRef, useState } from 'react';
import styled, { Keyframes, keyframes } from 'styled-components';
import { defaultScaleSize, scaleAnimation } from '../../hoc/scale-anim';

export enum ButtonClassNames {
  DISABLED = 'disabled',
  OUTLINE_DISABLED = 'outline-disabled',
  NORMAL = 'normal',
  OUTLINE_NORMAL = 'outline-normal',
}

const rippleAnimation = keyframes`
  from {
    opacity: 1;
    width: 0;
    height: 0;
  } 
  to {
    opacity: 0;
    width: 300px;
    height: 300px;
  }
`;

const Ripple = styled.div<IRipple>`
  width: 0;
  height: 0;
  background-color: #02acc8;
  border-radius: 100%;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  z-index: 200;
  transform: translate(-50%, -50%);
  animation-name: ${props => props.animationName};
  animation-duration: 0.5s;
  animation-play-state: ${props =>
    props.animationPlayState ? 'running' : 'paused'};
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
`;

const ButtonWrapper = styled.div<IButtonWrapper>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: ${props => (props.displayFlag ? 'flex' : 'none')};
  position: ${props => props.position || 'relative'};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  right: ${props => props.right}%;
  bottom: ${props => props.bottom}%;
  margin: ${props => props.margin};
  font-family: MTSSans, serif;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.4px;
  text-align: center;
  color: #ffffff;
  overflow: hidden;
  animation-name: ${props =>
    props.animFlag
      ? scaleAnimation(props.scaleSize || defaultScaleSize)
      : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  box-sizing: border-box;
  box-shadow: ${props => {
    switch (props.className) {
      case ButtonClassNames.NORMAL:
        return props.isHover ? '0 6px 12px 0 #bbc1c7' : '1px 1px 4px 0 #bbc1c7';
      case ButtonClassNames.OUTLINE_NORMAL:
        return props.isHover ? '0 6px 12px 0 #bbc1c7' : 'none';
    }
  }};
  .${ButtonClassNames.NORMAL} {
    border-radius: 2px;
    box-shadow: ${props =>
        props.isHover ? '0 6px 12px 0 #bbc1c7' : '1px 1px 4px 0 #bbc1c7'},
      inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
    background-color: #${props => (props.isHover ? '0193aa' : '02acc8')};
  }

  .${ButtonClassNames.DISABLED} {
    border-radius: 2px;
    background-color: #e2e5eb;
  }

  .${ButtonClassNames.OUTLINE_DISABLED} {
    width: ${props => props.width - 4}px;
    height: ${props => props.height - 4}px;
    color: #e2e5eb;
    border: solid 2px #e2e5eb;
  }

  .${ButtonClassNames.OUTLINE_NORMAL} {
    width: ${props => props.width - 4}px;
    height: ${props => props.height - 4}px;
    border: solid 2px #02acc8;
    color: #${props => (props.isHover ? 'ffffff' : '02acc8')};
    box-shadow: ${props =>
      props.isHover
        ? '0 6px 12px 0 #bbc1c7, inset 0 1px 3px 0 rgba(255, 255, 255, 0.5)'
        : ''};
    background-color: #${props => (props.isHover ? '0193aa' : '')};
  }
`;

const CustomButtonWrapper = styled.div<ICustomButtonWrapper>`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  border-radius: 2px;
  white-space: nowrap;
`;

const defaultButtonWidth = 200,
  defaultButtonHeight = 44;

export const Button: React.FC<IButton> = ({
  content,
  callback,
  animFlag = false,
  scaleSize,
  displayFlag = true,
  className,
  style,
  width = defaultButtonWidth,
  height = defaultButtonHeight,
  ...props
}) => {
  const [clickPos, setClickPos] = useState({ top: 0, left: 0 });
  const [animationPlayState, setAnimationPlayState] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (myRef.current) {
      const { x, y } = myRef.current.getBoundingClientRect();
      setClickPos({
        top: Math.abs(y - e.clientY),
        left: Math.abs(x - e.clientX),
      });
      setAnimationPlayState(true);
    }
  };

  const handleAnimationEnd = () => {
    setClickPos({ top: 0, left: 0 });
    setAnimationPlayState(false);
    if (callback) {
      callback();
    }
  };

  return (
    <ButtonWrapper
      displayFlag={displayFlag}
      onClick={handleClick}
      ref={myRef}
      isHover={isHover}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      className={className}
      width={width}
      height={height}
      style={style}
      animFlag={animFlag}
      scaleSize={scaleSize}
      {...props}
    >
      <Ripple
        {...clickPos}
        animationName={animationPlayState ? rippleAnimation : null}
        animationPlayState={animationPlayState}
        onAnimationEnd={handleAnimationEnd}
      />
      <CustomButtonWrapper displayFlag={displayFlag} className={className}>
        {content}
      </CustomButtonWrapper>
    </ButtonWrapper>
  );
};

interface ICustomButtonWrapper {
  src?: number;
  animFlag?: boolean;
  scaleSize?: number;
  className: string;
  displayFlag?: boolean;
}

interface IButton extends ICustomButtonWrapper {
  content?: string;
  color?: string;
  callback?: () => void;
  style?: React.CSSProperties;
  height?: number;
  width?: number;
}

interface IRipple {
  animationPlayState: boolean;
  animationName: Keyframes | null;
  top: number;
  left: number;
}

interface IButtonWrapper {
  isHover: boolean;
  position?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  displayFlag?: boolean;
  margin?: string;
  className?: string;
  width: number;
  height: number;
  animFlag?: boolean;
  scaleSize?: number;
}
