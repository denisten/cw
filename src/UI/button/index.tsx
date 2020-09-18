import React, { RefObject, useRef } from 'react';
import styled from 'styled-components';
import { defaultScaleSize, scaleAnimation } from '../../hoc/scale-anim';
import { MTSSans } from '../../fonts';
import coinIcon from './coinIcon.svg';
import coinIconDisabled from './coinIconDisabled.svg';

export enum ButtonClassNames {
  DISABLED = 'disabled',
  OUTLINE_DISABLED = 'outline-disabled',
  NORMAL = 'normal',
  OUTLINE_NORMAL = 'outline-normal',
  SCALE_ANIMATED = 'scale-animated',
  HOVERED = 'hovered',
  COIN_BUTTON = 'coin-button',
  COIN_BUTTON_DISABLED = 'coin-button-disabled',
}

const doubleBorderWidth = 4;

const Ripple = styled.div`
  width: 0;
  height: 0;
  background-color: #02acc8;
  border-radius: 100%;
  position: absolute;
  z-index: 200;
  transform: translate(-50%, -50%);
  transition-property: width, height, opacity;
  transition-timing-function: ease-in-out;
  display: flex;
  opacity: 1;
`;

const ButtonWrapper = styled.div<IButtonWrapper>`
  flex-shrink: 0;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  position: relative;
  font-family: ${MTSSans.BOLD};
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.4px;
  text-align: center;
  color: #ffffff;
  overflow: hidden;
  box-sizing: border-box;
  &.${ButtonClassNames.SCALE_ANIMATED} {
    animation-name: ${scaleAnimation(defaultScaleSize)};
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 1s;
  }

  &.${ButtonClassNames.COIN_BUTTON} {
    background-color: #04b5d2;
    border-radius: 10px;
    box-shadow: 1px 1px 4px 0 #bbc1c7,
      inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 7px 0 14px;
    width: auto;

    &::after {
      content: '';
      width: 34px;
      height: 34px;
      background: url(${coinIcon}) no-repeat center;
      margin-left: 15px;
      flex-shrink: 0;
    }
  }

  &.${ButtonClassNames.COIN_BUTTON_DISABLED} {
    border: 1px solid #c7c7c7;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 1px 1px 4px 0 #bbc1c7,
      inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 7px 0 14px;
    width: auto;
    pointer-events: none;
    color: #c7c7c7;

    &::after {
      content: '';
      width: 34px;
      height: 34px;
      background: url(${coinIconDisabled}) no-repeat center;
      margin-left: 15px;
      flex-shrink: 0;
    }
  }

  .${ButtonClassNames.NORMAL} {
    box-shadow: 1px 1px 4px 0 #bbc1c7,
      inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
    border-radius: 2px;
    background-color: #02acc8;
  }
  .${ButtonClassNames.NORMAL}.${ButtonClassNames.HOVERED} {
    box-shadow: 0 3px 8px 0 #bbc1c7, inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
    background-color: #129eb5;
  }

  .${ButtonClassNames.DISABLED} {
    border-radius: 2px;
    background-color: #e2e5eb;
    pointer-events: none;
  }

  .${ButtonClassNames.OUTLINE_DISABLED} {
    width: ${props => props.width - doubleBorderWidth}px;
    height: ${props => props.height - doubleBorderWidth}px;
    color: #e2e5eb;
    border: solid 2px #e2e5eb;
  }

  .${ButtonClassNames.OUTLINE_NORMAL} {
    width: ${props => props.width - doubleBorderWidth}px;
    height: ${props => props.height - doubleBorderWidth}px;
    border: solid 2px #02acc8;
    color: #02acc8;
    box-shadow: none;
    background-color: initial;
  }

  .${ButtonClassNames.OUTLINE_NORMAL}.${ButtonClassNames.HOVERED} {
    color: #ffffff;
    background-color: #129eb5;
  }
`;

const CustomButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
  white-space: nowrap;
`;

const defaultButtonWidth = 200,
  defaultButtonHeight = 44;

const onMouseOverHandler = (ref: RefObject<HTMLDivElement>) => {
  ref.current && ref.current.classList.add('hovered');
};

const onMouseOutHandler = (ref: RefObject<HTMLDivElement>) => {
  ref.current && ref.current.classList.remove('hovered');
};

const animateRipple = (node: HTMLElement) => {
  requestAnimationFrame(() => {
    node.style.width = '400px';
    node.style.height = '400px';
    node.style.opacity = '0';
    node.style.transitionDuration = '0.5s';
  });
};

const onRippleAnimationEnd = (node: HTMLElement) => {
  requestAnimationFrame(() => {
    node.style.width = '0';
    node.style.height = '0';
    node.style.opacity = '1';
    node.style.transitionDuration = '0s';
  });
};

export const Button: React.FC<IButton> = ({
  content,
  callback,
  className,
  style,
  pulseAnimFlag = false,
  width = defaultButtonWidth,
  height = defaultButtonHeight,
}) => {
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const rippleDivRef = useRef<HTMLDivElement>(null);
  const animStartedFlag = useRef(false);
  const buttonLayoutRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (buttonWrapperRef.current && rippleDivRef.current && animStartedFlag) {
      const { x, y } = buttonWrapperRef.current.getBoundingClientRect();
      rippleDivRef.current.style.top = Math.abs(y - e.clientY) + 'px';
      rippleDivRef.current.style.left = Math.abs(x - e.clientX) + 'px';
      animateRipple(rippleDivRef.current);
      animStartedFlag.current = true;
    }
  };
  const handleAnimationEnd = () => {
    if (rippleDivRef.current && animStartedFlag.current) {
      animStartedFlag.current = false;
      onRippleAnimationEnd(rippleDivRef.current);
      callback && callback();
    }
  };

  return (
    <ButtonWrapper
      onClick={handleClick}
      onMouseOver={() => onMouseOverHandler(buttonLayoutRef)}
      onMouseOut={() => onMouseOutHandler(buttonLayoutRef)}
      className={
        className + (pulseAnimFlag ? ` ${ButtonClassNames.SCALE_ANIMATED}` : '')
      }
      width={width}
      height={height}
      style={style}
      ref={buttonWrapperRef}
    >
      <Ripple onTransitionEnd={handleAnimationEnd} ref={rippleDivRef} />
      <CustomButtonWrapper className={className} ref={buttonLayoutRef}>
        {content}
      </CustomButtonWrapper>
    </ButtonWrapper>
  );
};

export interface IButton {
  pulseAnimFlag?: boolean;
  className: ButtonClassNames;
  content?: string;
  callback?: () => void;
  style?: React.CSSProperties;
  height?: number;
  width?: number;
}

interface IButtonWrapper {
  className?: string;
  width: number;
  height: number;
}
