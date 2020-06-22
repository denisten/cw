import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import arrowDown from './arrow-down.svg';
import { MTSSans } from '../../fonts';
import { StyledSpan } from '../span';
import { RowWrapper } from '../row-wrapper';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const defaultOptionsHeight = 329,
  defaultWidth = 109;
const DropdownWrapper = styled.div<IDropdownWrapper>`
  width: ${props => props.width}px;
  height: 44px;
  border-radius: 4px;
  border: solid 2px
    ${props => (props.opened ? '#02acc8' : 'rgba(2, 172, 200, 0.25)')};
  box-sizing: border-box;
  padding: 8px 0 11px 18px;
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

const Options = styled(StyledSpan)`
  width: 100%;
  height: 47px;
  background-color: #f7f7f7;
  position: relative;
  box-sizing: border-box;
  padding: 8px 0 11px 17px;
  font-family: ${MTSSans.REGULAR};
  font-size: 16px;
  line-height: 1.5;
  color: #001424;
  user-select: none;
  &:hover {
    background-color: #bae4eb;
    cursor: pointer;
  }
`;

const OptionsWrapper = styled.div<IOptionsWrapper>`
  position: absolute;
  top: 40px;
  width: ${props => props.width}px;
  height: ${props => props.optionsHeight}px;
  display: ${props => (props.displayFlag ? 'flex' : 'none')};
  flex-direction: column;
  overflow: auto;
  border: solid 2px #02acc8;
  border-top: none;
  box-sizing: border-box;
  z-index: ${ZIndexes.UI_BUTTON - 1};
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #f7f7f7;
  ${Options}:nth-child (1) {
    padding: 12px 0 11px 17px;
  }
`;

const ArrowImg = styled.img`
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
  user-select: none;
`;

const Input = styled.input`
  font-family: ${MTSSans.REGULAR};
  width: 70%;
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
const styledConfig = {
  rowWrapper: {
    justifyContent: 'space-between',
    padding: '0 9px 0 0',
    cursor: 'pointer',
  },
};

export const Dropdown: React.FC<IDropDown> = ({
  options,
  width = defaultWidth,
  optionsHeight = defaultOptionsHeight,
  style = {},
  onChangeCallback,
  value,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const arrowRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mouseInsideDiv, setMouseInsideDiv] = useState(false);
  useEffect(() => {
    if (arrowRef.current) {
      if (showOptions) {
        arrowRef.current.style.transform = 'rotate(180deg)';
      } else {
        arrowRef.current.style.transform = 'rotate(0deg)';
      }
    }
    showOptions && inputRef.current && inputRef.current.focus();
  }, [showOptions]);

  const handleFocusOut = () => {
    if (!mouseInsideDiv) setShowOptions(false);
  };
  const handleMouseEnter = () => setMouseInsideDiv(true);
  const handleMouseLeave = () => setMouseInsideDiv(false);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener('mouseenter', handleMouseEnter);
      wrapperRef.current.addEventListener('mouseleave', handleMouseLeave);
      wrapperRef.current.addEventListener('focusout', handleFocusOut);
    }
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('focusout', handleFocusOut);
        wrapperRef.current.removeEventListener('mouseleave', handleMouseLeave);
        wrapperRef.current.removeEventListener('mouseenter', handleFocusOut);
      }
    };
  });
  return (
    <MainWrapper ref={wrapperRef} style={style}>
      <DropdownWrapper
        width={width}
        opened={showOptions}
        onClick={() => setShowOptions(!showOptions)}
      >
        <RowWrapper style={styledConfig.rowWrapper}>
          <Input
            type="text"
            value={value || selectedValue || options[0]}
            ref={inputRef}
            readOnly={true}
          />
          <ArrowImg src={arrowDown} alt="arrow" ref={arrowRef} />
        </RowWrapper>
      </DropdownWrapper>

      <OptionsWrapper
        width={width}
        displayFlag={showOptions}
        optionsHeight={optionsHeight}
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
  width?: number;
  style?: React.CSSProperties;
  onChangeCallback: (el: string) => void;
  value?: string | number;
}

interface IOptionsWrapper {
  displayFlag: boolean;
  optionsHeight?: number;
  width: number;
}

interface IDropdownWrapper {
  opened: boolean;
  width: number;
}
