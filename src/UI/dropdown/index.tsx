import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import arrowDown from './arrow-down.svg';
import { MTSSans } from '../../fonts';
import { StyledSpan } from '../span';
import { RowWrapper } from '../row-wrapper';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const DropdownWrapper = styled.div<IDropdownWrapper>`
  width: ${props => props.width}px;
  height: 44px;
  border-radius: 4px;
  border: solid 2px
    ${props => (props.opened ? '#02acc8' : 'rgba(2, 172, 200, 0.25)')};
  box-sizing: border-box;
  padding: 8px 0 11px 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: ${ZIndexes.UI_BUTTON};
  background-color: white;
  &:hover {
    border: solid 2px #02acc8;
  }
`;

const MainWrapper = styled.div`
  &:hover,
  :focus {
    outline: none;
    cursor: pointer;
  }
`;

const OptionsWrapper = styled.div<IOptionsWrapper>`
  position: absolute;
  top: ${props => props.top}px;
  width: ${props => props.width}px;
  height: ${props => props.optionsHeight}px;
  display: ${props => (props.displayFlag ? 'flex' : 'none')};
  flex-direction: column;
  overflow: auto;
  border: solid 2px #02acc8;
  border-top: none;
  box-sizing: border-box;
  z-index: ${ZIndexes.UI_BUTTON - 1};
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Options = styled(StyledSpan)`
  width: 149px;
  height: 47px;
  background-color: #f7f7f7;
  position: relative;
  box-sizing: border-box;
  padding: 8px 0 11px 16px;
  font-family: ${MTSSans.REGULAR};
  font-size: 16px;
  line-height: 1.5;
  color: #001424;
  &:hover {
    background-color: #bae4eb;
    cursor: pointer;
  }
`;

const ArrowImg = styled.img`
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
  user-select: none;
`;

const Input = styled.input`
  font-family: ${MTSSans.REGULAR};
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #001424;
  border: none;
  background-color: #fff;
  appearance: none;
  &:hover,
  :focus {
    outline: none;
    cursor: pointer;
  }
`;

const defaultOptionsHeight = 100,
  defaultWidth = 109,
  defaultTop = 0;

export const Dropdown: React.FC<IDropDown> = ({
  options,
  optionsHeight = defaultOptionsHeight,
  top = defaultTop,
  width = defaultWidth,
  style = {},
  onChangeCallback,
  value,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const arrowRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (arrowRef.current) {
      if (showOptions) {
        arrowRef.current.style.transform = 'rotate(180deg)';
      } else {
        arrowRef.current.style.transform = 'rotate(0deg)';
      }
    }
  }, [showOptions]);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener('focusout', () => {
        setShowOptions(false);
      });
    }
  }, []);
  return (
    <MainWrapper ref={wrapperRef} style={style}>
      <DropdownWrapper
        opened={showOptions}
        onClick={() => setShowOptions(!showOptions)}
        width={width}
      >
        <RowWrapper
          justifyContent="space-between"
          style={{ cursor: 'pointer' }}
          padding="0 9px 0 0"
        >
          <Input
            type="text"
            value={value || selectedValue || options[0]}
            ref={inputRef}
            readOnly={true}
          />
          <ArrowImg
            src={arrowDown}
            alt="arrow"
            ref={arrowRef}
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          />
        </RowWrapper>
      </DropdownWrapper>

      <OptionsWrapper
        displayFlag={showOptions}
        optionsHeight={optionsHeight}
        top={top}
        width={width}
      >
        {options.map(el => (
          <Options
            key={el}
            onMouseDown={() => {
              setSelectedValue(el);
              setShowOptions(false);
              onChangeCallback(el);
            }}
          >
            {el}
          </Options>
        ))}
      </OptionsWrapper>
    </MainWrapper>
  );
};

interface IDropDown {
  options: string[];
  optionsHeight?: number;
  top?: number;
  width?: number;
  style?: React.CSSProperties;
  onChangeCallback: (el: string) => void;
  value?: string;
}

interface IOptionsWrapper {
  displayFlag: boolean;
  optionsHeight?: number;
  top?: number;
  width: number;
}

interface IDropdownWrapper {
  opened: boolean;
  width: number;
}
